package com.youniform.api.domain.alert.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.SuccessCode.ALERT_LIST_OK;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
                "FRIEND_REQUEST", "", "friend link", false, false, "2024-07-31");
        AlertDto dto2 = new AlertDto(124L, "'1604b772-adc0-4212-8a90-81186c57f100", "User2", "s3 url",
                "POST_COMMENT", "최강 몬스터즈 우승", "friend link", false, false, "2024-07-31");
        AlertDto dto3 = new AlertDto(125L, "'1604b772-adc0-4212-8a90-81186c57f100", "User2", "s3 url",
                "FRIEND_REQUEST", "", "friend link", false, false, "1시간 전");
        alertList.add(dto1);
        alertList.add(dto2);
        alertList.add(dto3);

        when(alertService.findAlerts(anyLong())).thenReturn(new AlertListRes(alertList));

        ResultActions actions = mockMvc.perform(
                get("/alerts/list")
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
                                                fieldWithPath("body.alertList[].eventId").type(JsonFieldType.NUMBER).description("알림 이벤트 ID"),
                                                fieldWithPath("body.alertList[].senderUuid").type(JsonFieldType.STRING).description("알림 전송자 Id(UUID)"),
                                                fieldWithPath("body.alertList[].senderNickname").type(JsonFieldType.STRING).description("알림 전송자 닉네임"),
                                                fieldWithPath("body.alertList[].senderProfileUrl").type(JsonFieldType.STRING).description("알림 전송자 프로필 url"),
                                                fieldWithPath("body.alertList[].type").type(JsonFieldType.STRING).description("알림 타입 (ANNOUNCEMENT, FRIEND_REQUEST, POST_COMMENT)"),
                                                fieldWithPath("body.alertList[].content").type(JsonFieldType.STRING).description("알림 내용 (댓글 내용)"),
                                                fieldWithPath("body.alertList[].link").type(JsonFieldType.STRING).description("알림 연결 링크"),
                                                fieldWithPath("body.alertList[].isRead").type(JsonFieldType.BOOLEAN).description("일림 읽음 여부"),
                                                fieldWithPath("body.alertList[].isDeleted").type(JsonFieldType.BOOLEAN).description("알림 삭제 여부"),
                                                fieldWithPath("body.alertList[].createdAt").type(JsonFieldType.STRING).description("알림 생성일")
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 마이리스트 조회 Response"))
                                .build()
                        )));
    }
}