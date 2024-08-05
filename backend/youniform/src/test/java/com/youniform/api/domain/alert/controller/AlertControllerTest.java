package com.youniform.api.domain.alert.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
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
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AlertController.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("알림 API 명세서")
@WithMockUser
class AlertControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtService jwtService;

//    @Test
//    void 알림_연결_성공() throws Exception {
//        String jwtToken = jwtService.createAccessToken(UUID);
//
//        ResultActions actions = mockMvc.perform(
//                get("/alerts/subscribe")
//                        .header("Authorization", "Bearer " + jwtToken)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//        );
//
//        actions.andExpect(status().isOk())
//                .andDo(document("Alert 연결 성공 (유저 로그인 시 최초만 연결 요청. 이벤트 발생 시 응답)",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        resource(ResourceSnippetParameters.builder()
//                                .tag("Alert API")
//                                .summary("Alert 연결 API")
//                                .requestHeaders(
//                                        headerWithName("Authorization").description("JWT 토큰")
//                                )
//                                .responseFields(
//                                        getCommonResponseFields(
//                                                fieldWithPath("body.eventId").type(JsonFieldType.NUMBER).description("알림 이벤트 Id"),
//                                                fieldWithPath("body.content").type(JsonFieldType.STRING).description("알림 내용"),
//                                                fieldWithPath("body.type").type(JsonFieldType.STRING).description("알림 타입 (FRIEND_REQUEST, POST_COMMENT)"),
//                                                fieldWithPath("body.isRead").type(JsonFieldType.BOOLEAN).description("알림 읽음 여부"),
//                                                fieldWithPath("body.createdAt").type(JsonFieldType.STRING).description("알림 생성일"),
//                                                fieldWithPath("body.link").type(JsonFieldType.STRING).description("알림 연결 링크")
//                                        )
//                                )
//                                .responseSchema(Schema.schema("Alert 연결 Response"))
//                                .build()
//                        ))
//                );
//    }
}