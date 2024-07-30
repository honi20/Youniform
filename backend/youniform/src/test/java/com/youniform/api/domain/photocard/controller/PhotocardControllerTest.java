package com.youniform.api.domain.photocard.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.photocard.dto.PhotocardAddReq;
import com.youniform.api.global.jwt.service.JwtService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.domain.photocard.util.PhotocardTestUtil.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PhotocardController.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("포토카드 API 명세서")
@WithMockUser
class PhotocardControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @MockBean
    JwtService jwtService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void 포토카드_생성_성공() throws Exception {
        PhotocardAddReq photocardAddReq = getPhotocardAddReq("도영이", "도영이가 홈런 친 날", getPhotocardContentDto());
        String content = mapper.writeValueAsString(photocardAddReq);
        String jwtToken = jwtService.createAccessToken(UUID);

        ResultActions actions = mockMvc.perform(
                post("/photocards")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        actions.andExpect(status().isCreated())
                .andDo(document("Photocard 생성 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        getPhotocardFields("")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.photocardId").type(JsonFieldType.NUMBER).description("생성된 포토카드 Id")
                                        )
                                )
                                .requestSchema(Schema.schema("Photocard 생성 Request"))
                                .responseSchema(Schema.schema("Photocard 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_상세조회_성공() throws Exception {
        String jwtToken = jwtService.createAccessToken(UUID);

        ResultActions actions = mockMvc.perform(
                get("/photocards/{photocardId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isOk())
                .andDo(document("Photocard 상세조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 상세조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                getPhotocardFields("body.").toArray(new FieldDescriptor[0])
                                        )
                                )
                                .responseSchema(Schema.schema("Photocard 상세조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_상세조회_실패_존재하지_않는_포토카드() throws Exception {
        String jwtToken = jwtService.createAccessToken(UUID);

        ResultActions actions = mockMvc.perform(
                get("/photocards/{photocardId}", -1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isNotFound())
                .andDo(document("Photocard 상세조회 실패 - 존재하지 않는 포토카드",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional().ignored()
                                        )
                                )
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_삭제_성공() throws Exception {
        String jwtToken = jwtService.createAccessToken(UUID);

        ResultActions actions = mockMvc.perform(
                delete("/photocards/{photocardId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        actions.andExpect(status().isNoContent())
                .andDo(document("Photocard 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.OBJECT).description("response body").optional().ignored()
                                        )
                                )
                                .responseSchema(Schema.schema("Photocard 삭제 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_삭제_실패_존재하지_않는_포토카드() throws Exception {
        String jwtToken = jwtService.createAccessToken(UUID);

        ResultActions actions = mockMvc.perform(
                delete("/photocards/{photocardId}", -1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        actions.andExpect(status().isNotFound())
                .andDo(document("Photocard 삭제 실패 - 존재하지 않는 포토카드",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional().ignored()
                                        )
                                )
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_리스트_조회_성공() throws Exception {
        String jwtToken = jwtService.createAccessToken(UUID);

        ResultActions actions = mockMvc.perform(
                get("/photocards")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isOk())
                .andDo(document("Photocard 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                getPhotocardFields("body.photocardList[].").toArray(new FieldDescriptor[0])
                                        )
                                )
                                .responseSchema(Schema.schema("Photocard 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

}