package com.youniform.api.domain.photocard.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.photocard.dto.*;
import com.youniform.api.domain.photocard.service.PhotocardService;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.ErrorCode.PHOTOCARD_ACCESS_FORBIDDEN;
import static com.youniform.api.global.statuscode.ErrorCode.PHOTOCARD_NOT_FOUND;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.global.statuscode.SuccessCode.PHOTOCARD_DELETED;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("포토카드 API 명세서")
@WithMockUser
class PhotocardControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private PhotocardService photocardService;

    private String jwtToken;

    @BeforeEach
    public void setup() throws JsonProcessingException {
        jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ";

        when(jwtService.createAccessToken(UUID)).thenReturn(jwtToken);
        when(jwtService.getAuthentication(jwtToken)).thenReturn(
                new UsernamePasswordAuthenticationToken(123L, null, List.of())
        );

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(123L, null, List.of())
        );
    }

    @Test
    public void 포토카드_생성_성공() throws Exception {
        when(photocardService.addPhotocard(anyLong(), any())).thenReturn(new PhotocardAddRes(1L));
        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        ResultActions actions = mockMvc.perform(
                multipart("/photocards")
                        .file(file)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_CREATED.getMessage()))
                .andDo(document("Photocard 생성 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
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
        PhotocardDetailDto photocardDetailDto = new PhotocardDetailDto(1L, "photocard1.png");

        when(photocardService.findPhotocard(anyLong(), anyLong())).thenReturn(photocardDetailDto);

        ResultActions actions = mockMvc.perform(
                get("/photocards/{photocardId}", 123L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_DETAILS_OK.getMessage()))
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
                                                fieldWithPath("body.photocardId").type(JsonFieldType.NUMBER).description("포토카드 Id"),
                                                fieldWithPath("body.imgUrl").type(JsonFieldType.STRING).description("포토카드 이미지 URL")
                                        )
                                )
                                .responseSchema(Schema.schema("Photocard 상세조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_상세조회_실패_존재하지_않는_포토카드() throws Exception {
        when(photocardService.findPhotocard(anyLong(), anyLong())).thenThrow(new CustomException(PHOTOCARD_NOT_FOUND));

        ResultActions actions = mockMvc.perform(
                get("/photocards/{photocardId}", 123L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_NOT_FOUND.getMessage()))
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
                                                fieldWithPath("body").type(JsonFieldType.NULL).optional().ignored()
                                        )
                                )
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_상세조회_실패_권한_없음() throws Exception {
        when(photocardService.findPhotocard(anyLong(), anyLong())).thenThrow(new CustomException(PHOTOCARD_ACCESS_FORBIDDEN));

        ResultActions actions = mockMvc.perform(
                get("/photocards/{photocardId}", 125L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_ACCESS_FORBIDDEN.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_ACCESS_FORBIDDEN.getMessage()))
                .andDo(document("Photocard 상세조회 실패 - 접근 권한 없음 (작성자만 접근 가능)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).optional().ignored()
                                        )
                                )
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_삭제_성공() throws Exception {
        List<Long> photocardIdList = List.of(1L, 2L);
        String[] photocardIds = photocardIdList.stream().map(String::valueOf).toArray(String[]::new);

        photocardService.removePhotocard(anyLong(), any(PhotocardDeleteReq.class));

        ResultActions actions = mockMvc.perform(
                delete("/photocards")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("photocardIdList", photocardIds)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_DELETED.getMessage()))
                .andDo(document("Photocard 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("photocardIdList").description("삭제할 포토카드 ID 리스트").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).ignored()
                                        )
                                )
                                .responseSchema(Schema.schema("Photocard 삭제 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_삭제_실패_존재하지_않는_포토카드() throws Exception {
        List<Long> photocardIdList = List.of(1L, 100L);
        String[] photocardIds = photocardIdList.stream().map(String::valueOf).toArray(String[]::new);

        doThrow(new CustomException(PHOTOCARD_NOT_FOUND)).when(photocardService).removePhotocard(anyLong(), any(PhotocardDeleteReq.class));

        ResultActions actions = mockMvc.perform(
                delete("/photocards")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("photocardIdList", photocardIds)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        actions.andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_NOT_FOUND.getMessage()))
                .andDo(document("Photocard 삭제 실패 - 존재하지 않는 포토카드 ID",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("photocardIdList").description("삭제할 포토카드 ID 리스트").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).ignored()
                                        )
                                )
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_삭제_실패_권한_없음() throws Exception {
        List<Long> photocardIdList = List.of(1L, 3L);
        String[] photocardIds = photocardIdList.stream().map(String::valueOf).toArray(String[]::new);

        doThrow(new CustomException(PHOTOCARD_ACCESS_FORBIDDEN)).when(photocardService).removePhotocard(anyLong(), any(PhotocardDeleteReq.class));

        ResultActions actions = mockMvc.perform(
                delete("/photocards")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("photocardIdList", photocardIds)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        actions.andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_ACCESS_FORBIDDEN.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_ACCESS_FORBIDDEN.getMessage()))
                .andDo(document("Photocard 삭제 실패 - 권한 없음 (작성자만 삭제 가능)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Photocard API")
                                .summary("Photocard 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("photocardIdList").description("삭제할 포토카드 ID 리스트").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).ignored()
                                        )
                                )
                                .build()
                        ))
                );
    }

    @Test
    public void 포토카드_리스트_조회_성공() throws Exception {
        List<PhotocardDetailDto> photocardList = new ArrayList<>();
        PhotocardDetailDto detail1 = new PhotocardDetailDto(1L, "photocard1.png");
        PhotocardDetailDto detail2 = new PhotocardDetailDto(2L, "photocard2.png");
        photocardList.add(detail1);
        photocardList.add(detail2);

        when(photocardService.findPhotocards(anyLong())).thenReturn(new PhotocardListRes(photocardList));

        ResultActions actions = mockMvc.perform(
                get("/photocards")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PHOTOCARD_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PHOTOCARD_LIST_OK.getMessage()))
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
                                                fieldWithPath("body.photocardList[]").type(JsonFieldType.ARRAY).description("포토카드 리스트"),
                                                fieldWithPath("body.*[].photocardId").type(JsonFieldType.NUMBER).description("포토카드 Id"),
                                                fieldWithPath("body.*[].imgUrl").type(JsonFieldType.STRING).description("포토카드 이미지 URL")
                                        )
                                )
                                .responseSchema(Schema.schema("Photocard 상세조회 Response"))
                                .build()
                        ))
                );
    }
}