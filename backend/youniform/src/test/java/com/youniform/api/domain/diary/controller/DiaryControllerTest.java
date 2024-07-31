package com.youniform.api.domain.diary.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.diary.dto.DiaryAddReq;
import com.youniform.api.domain.diary.dto.DiaryAddRes;
import com.youniform.api.domain.diary.dto.DiaryModifyReq;
import com.youniform.api.domain.diary.service.DiaryService;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.statuscode.ErrorCode;
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
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.domain.diary.util.DiaryTestUtil.*;
import static com.youniform.api.global.statuscode.ErrorCode.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DiaryController.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("다이어리 API 명세서")
@WithMockUser
public class DiaryControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private DiaryService diaryService;

    private String jwtToken;

    @BeforeEach
    public void setup() {
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
    public void 다이어리_생성_성공() throws Exception {
        // given
        DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-27", getDiaryContentDto(true), "ALL", 1L);
        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenReturn(new DiaryAddRes(1L));

        // when & then
        performPost("/diaries", diaryAddReq)
                .andExpect(status().isCreated())
                .andDo(document("Diary 생성 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        getDiaryFields("")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.diaryId").type(JsonFieldType.NUMBER).description("생성된 다이어리 Id").optional().ignored()
                                        )
                                )
                                .requestSchema(Schema.schema("Diary 생성 Request"))
                                .responseSchema(Schema.schema("Diary 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_생성_실패_잘못된_날짜형식() throws Exception {
        DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07", getDiaryContentDto(true), "ALL", 1L);
        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(INVALID_DIARY_DATE));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isBadRequest())
                .andDo(document(
                        "Diary 생성 실패 - 잘못된 날짜 형식 (yyyy-mm-dd 형식이 아닌 경우)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional().ignored()
                                        )
                                )
                                .responseSchema(Schema.schema("Error Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_생성_실패_잘못된_컨텐츠형식() throws Exception {
        DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-30", getDiaryContentDto(false), "ALL", 1L);
        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(INVALID_DIARY_CONTENTS));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isBadRequest())
                .andDo(document(
                        "Diary 생성 실패 - 잘못된 컨텐츠 형식 (version, objects, background, backgroundImage)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
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
    public void 다이어리_생성_실패_잘못된_공개범위() throws Exception {
        DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-30", getDiaryContentDto(true), "ONLY_ME", 1L);
        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(INVALID_DIARY_SCOPE));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isBadRequest())
                .andDo(document(
                        "Diary 생성 실패 - 잘못된 공개범위 (ALL, FRIENDS, PRIVATE 중 하나가 아닌 경우)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
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
    public void 다이어리_생성_실패_존재하지_않은_스탬프() throws Exception {
        DiaryAddReq diaryAddReq = getDiaryAddReq("2024-07-30", getDiaryContentDto(true), "ONLY_ME", 100L);
        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(STAMP_NOT_FOUND));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isNotFound())
                .andDo(document(
                        "Diary 생성 실패 - 존재하지 않은 스탬프 (Stamp ID가 유효하지 않음)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
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

    /**
    @Test
    public void 다이어리_상세조회_성공() throws Exception {
        Long diaryId = 1L;

        performGet("/diaries/{diaryId}", diaryId)
                .andExpect(status().isOk())
                .andDo(document(
                        "Diary 상세조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 상세조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                getDiaryFields("body.").toArray(new FieldDescriptor[0])
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 상세조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_상세조회_실패_존재하지_않는_다이어리() throws Exception {
        Long diaryId = -1L;

        performGet("/diaries/{diaryId}", diaryId)
                .andExpect(status().isNotFound())
                .andDo(document(
                        "Diary 상세조회 실패 - 존재하지 않는 다이어리 (Diary ID가 유효하지 않음)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
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
    public void 다이어리_수정_성공() throws Exception {
        DiaryModifyReq diaryModifyReq = getDiaryModifyReq(getDiaryContentDto(true), "ALL", 1L);

        // when & then
        performPut("/diaries/{diaryId}", diaryModifyReq, 1L)
                .andExpect(status().isNoContent())
                .andDo(document("Diary 수정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        getDiaryFields("")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.OBJECT).description("response body").optional().ignored()
                                        )
                                )
                                .requestSchema(Schema.schema("Diary 수정 Request"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_수정_실패_존재하지_않는_다이어리() throws Exception {
        DiaryModifyReq diaryModifyReq = getDiaryModifyReq(getDiaryContentDto(true), "ALL", 1L);

        // when & then
        performPut("/diaries/{diaryId}", diaryModifyReq, -1L)
                .andExpect(status().isNotFound())
                .andDo(document("Diary 수정 실패 - 존재하지 않는 다이어리 (Diary ID가 유효하지 않음)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        getDiaryFields("")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.OBJECT).description("에러 상세").optional().ignored()
                                        )
                                )
                                .requestSchema(Schema.schema("Diary 수정 Request"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_삭제_성공() throws Exception {
        performDelete("/diaries/{diaryId}", 1L)
                .andExpect(status().isNoContent())
                .andDo(document("Diary 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.OBJECT).description("response body").optional().ignored()
                                        )
                                )
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_삭제_실패_존재하지_않는_다이어리() throws Exception {
        performDelete("/diaries/{diaryId}", -1L)
                .andExpect(status().isNotFound())
                .andDo(document("Diary 삭제 실패 - 존재하지 않는 다이어리 (Diary ID가 유효하지 않음)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
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
    public void 다이어리_마이리스트_조회_성공() throws Exception {
        performGet("/diaries/list")
                .andExpect(status().isOk())
                .andDo(document(
                        "Diary 마이리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 마이리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                getDiaryFields("body.diaryList[].").toArray(new FieldDescriptor[0])
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 마이리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_리스트_조회_성공() throws Exception {
        performGet("/diaries/list/{userUuid}", "ssafy")
                .andExpect(status().isOk())
                .andDo(document(
                        "Diary 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                getDiaryFields("body.diaryList[].").toArray(new FieldDescriptor[0])
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_리스트_조회_실패_존재하지_않는_유저() throws Exception {
        performGet("/diaries/list/{userUuid}", "noUser")
                .andExpect(status().isNotFound())
                .andDo(document(
                        "Diary 리스트 조회 실패 - 존재하지 않는 작성자 (User UUID가 유효하지 않음)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
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
    public void 다이어리_리소스_조회_성공() throws Exception {
        performGet("/diaries/resources")
                .andExpect(status().isOk())
                .andDo(document(
                        "Resource 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Resource 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        fieldWithPath("header.httpStatusCode").type(JsonFieldType.NUMBER).description("응답 코드"),
                                        fieldWithPath("header.message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.resources[]").description("Resource 타입별 리스트"),
                                        fieldWithPath("body.resources[].type").type(JsonFieldType.STRING).description("Resource 타입명 (BACKGROUND, STICKER, THEME)"),
                                        fieldWithPath("body.resources[].categories[]").description("Resource 카테고리별 리스트"),
                                        fieldWithPath("body.resources[].categories[].category").type(JsonFieldType.STRING).description("Resource 카테고리명 (NONE, BASEBALL, RETRO, CUTE, LETTER)"),
                                        fieldWithPath("body.resources[].categories[].items[]").description("Resource Item 정보"),
                                        fieldWithPath("body.resources[].categories[].items[].label").type(JsonFieldType.STRING).description("Resource Item 라벨명"),
                                        fieldWithPath("body.resources[].categories[].items[].imgUrl").type(JsonFieldType.STRING).description("Resource Item 이미지 URL"),
                                        fieldWithPath("body.stamps[]").description("Stamp 리스트"),
                                        fieldWithPath("body.stamps[].stampId").type(JsonFieldType.NUMBER).description("Stamp ID"),
                                        fieldWithPath("body.stamps[].label").type(JsonFieldType.STRING).description("Stamp 라벨명"),
                                        fieldWithPath("body.stamps[].imgUrl").type(JsonFieldType.STRING).description("Stamp 이미지 URL")
                                )
                                .responseSchema(Schema.schema("Resource 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

     */

    private ResultActions performPost(String path, DiaryAddReq diaryAddReq) throws Exception {
        String content = mapper.writeValueAsString(diaryAddReq);

        return mockMvc.perform(
                post(path)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
    }

    private ResultActions performGet(String path, Object... pathVariable) throws Exception {
        MockHttpServletRequestBuilder requestBuilder;

        if (pathVariable != null && pathVariable.length > 0) {
            requestBuilder = get(path, pathVariable);
        } else {
            requestBuilder = get(path);
        }

        String jwtToken = jwtService.createAccessToken(UUID);

        return mockMvc.perform(
                requestBuilder
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );
    }

    private ResultActions performPut(String path, DiaryModifyReq diaryModifyReq, Object... pathVariable) throws Exception {
        String content = mapper.writeValueAsString(diaryModifyReq);
        String jwtToken = jwtService.createAccessToken(UUID);

        return mockMvc.perform(
                put(path, pathVariable)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
    }

    private ResultActions performDelete(String path, Object... pathVariable) throws Exception {
        String jwtToken = jwtService.createAccessToken(UUID);

        return mockMvc.perform(
                delete(path, pathVariable)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );
    }
}
