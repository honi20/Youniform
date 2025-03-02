package com.youniform.api.domain.alert.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.alert.dto.AlertDto;
import com.youniform.api.domain.alert.dto.AlertListRes;
import com.youniform.api.domain.alert.service.AlertService;
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
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
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

    @MockBean
    private AlertService alertService;

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
    void 알림_리스트_조회_성공() throws Exception {
        List<AlertDto> alertList = new ArrayList<>();
        AlertDto dto1 = new AlertDto(123L, "'1604b772-adc0-4212-8a90-81186c57f100", "User2", "s3 url",
                "FRIEND_REQUEST", "", null, false, "2024-07-31");
        AlertDto dto2 = new AlertDto(124L, "'1604b772-adc0-4212-8a90-81186c57f100", "User2", "s3 url",
                "POST_COMMENT", "최강 몬스터즈 우승", 1L, false, "2024-07-31");
        AlertDto dto3 = new AlertDto(125L, "'1604b772-adc0-4212-8a90-81186c57f100", "User2", "s3 url",
                "FRIEND_REQUEST", "", null, false, "1시간 전");
        alertList.add(dto1);
        alertList.add(dto2);
        alertList.add(dto3);

        when(alertService.findAlerts(anyLong())).thenReturn(new AlertListRes(alertList));

        ResultActions actions = mockMvc.perform(
                get("/api/alerts/list")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ALERT_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ALERT_LIST_OK.getMessage()))
                .andDo(document(
                        "알림 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Alert API")
                                .summary("Alert 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.alertList[]").description("Alert 리스트"),
                                                fieldWithPath("body.alertList[].alertId").type(JsonFieldType.NUMBER).description("알림 이벤트 ID"),
                                                fieldWithPath("body.alertList[].senderUuid").type(JsonFieldType.STRING).description("알림 전송자 Id(UUID)"),
                                                fieldWithPath("body.alertList[].senderNickname").type(JsonFieldType.STRING).description("알림 전송자 닉네임"),
                                                fieldWithPath("body.alertList[].senderProfileUrl").type(JsonFieldType.STRING).description("알림 전송자 프로필 url"),
                                                fieldWithPath("body.alertList[].type").type(JsonFieldType.STRING).description("알림 타입 (ANNOUNCEMENT, FRIEND_REQUEST, POST_COMMENT)"),
                                                fieldWithPath("body.alertList[].content").type(JsonFieldType.STRING).description("알림 내용 (댓글 내용)"),
                                                fieldWithPath("body.alertList[].pk").type(JsonFieldType.NUMBER).description("알림 연결 링크(Post인 경우 PK)").optional(),
                                                fieldWithPath("body.alertList[].isRead").type(JsonFieldType.BOOLEAN).description("일림 읽음 여부"),
                                                fieldWithPath("body.alertList[].createdAt").type(JsonFieldType.STRING).description("알림 생성일")
                                        )
                                )
                                .responseSchema(Schema.schema("Alert 리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    void 알림_읽음_처리_성공() throws Exception {
        ResultActions actions = mockMvc.perform(
                patch("/api/alerts/{alertId}", 123L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ALERT_READ_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ALERT_READ_MODIFIED.getMessage()))
                .andDo(document(
                        "알림 읽음 처리 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Alert API")
                                .summary("Alert 읽음 처리 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).ignored()
                                        )
                                )
                                .build()
                        )));
    }

    @Test
    void 알림_모두_읽음_처리_성공() throws Exception {
        ResultActions actions = mockMvc.perform(
                patch("/api/alerts")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ALERT_READ_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ALERT_READ_MODIFIED.getMessage()))
                .andDo(document(
                        "알림 모두 읽음 처리 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Alert API")
                                .summary("Alert 모두 읽음 처리 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).ignored()
                                        )
                                )
                                .build()
                        )));
    }

    @Test
    void 알림_삭제_성공() throws Exception {
        ResultActions actions = mockMvc.perform(
                delete("/api/alerts/{alertId}", 123L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ALERT_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ALERT_DELETED.getMessage()))
                .andDo(document(
                        "알림 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Alert API")
                                .summary("Alert 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).ignored()
                                        )
                                )
                                .build()
                        )));
    }

    @Test
    void 알림_모두_삭제_성공() throws Exception {
        ResultActions actions = mockMvc.perform(
                delete("/api/alerts")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ALERT_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ALERT_DELETED.getMessage()))
                .andDo(document(
                        "알림 모두 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Alert API")
                                .summary("Alert 모두 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL).ignored()
                                        )
                                )
                                .build()
                        )));
    }
}