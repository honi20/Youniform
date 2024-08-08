package com.youniform.api.domain.diary.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.*;
import com.youniform.api.domain.diary.entity.Scope;
import com.youniform.api.domain.diary.service.DiaryService;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.redis.RedisUtils;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.domain.diary.util.DiaryTestUtil.*;
import static com.youniform.api.global.statuscode.ErrorCode.*;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doThrow;
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
@Transactional
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

    @MockBean
    private RedisUtils redisUtils;

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

        setRedisDiaryContent(123L);
        setRedisDiaryContent(124L);
        setRedisDiaryContent(125L);
    }

    @Test
    public void 다이어리_생성_성공() throws Exception {
        // given
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(true), "ALL", 1L, "diary image url");

        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenReturn(new DiaryAddRes(2L));

        // when & then
        performPost("/diaries", diaryAddReq)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_CREATED.getMessage()))
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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07", getDiaryContentDto(true), "ALL", 1L, "diary image url");

        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(INVALID_DIARY_DATE));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_DIARY_DATE.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_DIARY_DATE.getMessage()))
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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(false), "ALL", 1L, "diary image url");

        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(INVALID_DIARY_CONTENTS));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_DIARY_CONTENTS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_DIARY_CONTENTS.getMessage()))
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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(true), "ONLY_ME", 1L, "diary image url");

        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(INVALID_DIARY_SCOPE));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_DIARY_SCOPE.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_DIARY_SCOPE.getMessage()))
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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(true), "ALL", 100L, "diary image url");

        when(diaryService.addDiary(anyLong(), any(DiaryAddReq.class))).thenThrow(new CustomException(STAMP_NOT_FOUND));

        performPost("/diaries", diaryAddReq)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(STAMP_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(STAMP_NOT_FOUND.getMessage()))
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

    @Test
    public void 다이어리_상세조회_성공() throws Exception {
        DiaryDetailDto diaryDetailDto = new DiaryDetailDto(123L, "User1", "s3 url", LocalDate.parse("2024-07-31"), getDiaryContent(), Scope.FRIENDS, "http://youniform.com/sticker1.png", "diary image url");

        when(diaryService.detailDiary(anyLong(), anyLong())).thenReturn(diaryDetailDto);

        performGet("/diaries/{diaryId}", 123L)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_DETAILS_OK.getMessage()))
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
        when(diaryService.detailDiary(anyLong(), anyLong())).thenThrow(new CustomException(DIARY_NOT_FOUND));

        performGet("/diaries/{diaryId}", 100L)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_NOT_FOUND.getMessage()))
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
    public void 다이어리_마이리스트_조회_성공() throws Exception {
        List<DiaryListDto> diaryList = new ArrayList<>();
        diaryList.add(new DiaryListDto(123L, "User1", "s3 url", LocalDate.parse("2024-07-31"), Scope.FRIENDS, "http://youniform.com/sticker1.png", "diary1 image url"));
        diaryList.add(new DiaryListDto(125L, "User1", "s3 url", LocalDate.parse("2024-07-12"), Scope.PRIVATE, "http://youniform.com/sticker1.png", "diary2 image url"));
        diaryList.add(new DiaryListDto(124L, "User1", "s3 url", LocalDate.parse("2024-07-01"), Scope.ALL, "http://youniform.com/sticker1.png", "diary3 image url"));

        PageRequest pageRequest = PageRequest.of(0, 10);
        SliceDto<DiaryListDto> sliceDto = new SliceDto<>(new SliceImpl<>(diaryList, pageRequest, false));
        DiaryListRes response = new DiaryListRes(sliceDto);

        when(diaryService.findMyDiaries(anyLong(), any(), any())).thenReturn(response);

        ResultActions actions = mockMvc.perform(
                get("/diaries/list")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("lastDiaryDate", "2024-07-12")
                        .param("sort", "diaryDate,desc"));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MY_DIARIES_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MY_DIARIES_OK.getMessage()))
                .andDo(document(
                        "Diary 마이리스트 조회 성공 - sort에 diaryDate(아래로 스크롤) 또는 diaryDate,desc(위로 스크롤)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 마이리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("lastDiaryDate").description("마지막 조회 다이어리 날짜 (yyyy-mm-dd)"),
                                        parameterWithName("sort").description("정렬 (diaryDate 또는 diaryDate,desc)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                getDiaryListFields("body.diaryList.").toArray(new FieldDescriptor[0])
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 마이리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 다이어리_리스트_조회_성공() throws Exception {
        List<DiaryListDto> diaryList = new ArrayList<>();
        diaryList.add(new DiaryListDto(123L, "User1", "s3 url", LocalDate.parse("2024-07-31"), Scope.FRIENDS, "http://youniform.com/sticker1.png", "diary1 image url"));
        diaryList.add(new DiaryListDto(125L, "User1", "s3 url", LocalDate.parse("2024-07-12"), Scope.PRIVATE, "http://youniform.com/sticker1.png", "diary2 image url"));
        diaryList.add(new DiaryListDto(124L, "User1", "s3 url", LocalDate.parse("2024-07-01"), Scope.ALL, "http://youniform.com/sticker1.png", "diary3 image url"));

        PageRequest pageRequest = PageRequest.of(0, 10);
        SliceDto<DiaryListDto> sliceDto = new SliceDto<>(new SliceImpl<>(diaryList, pageRequest, false));
        DiaryListRes response = new DiaryListRes(sliceDto);

        when(diaryService.findDiaries(anyString(), any(), any())).thenReturn(response);

        ResultActions actions = mockMvc.perform(
                get("/diaries/list/{userId}", "1604b772-adc0-4212-8a90-81186c57f598")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("lastDiaryDate", "2024-07-12")
                        .param("sort", "diaryDate,desc"));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(OTHER_DIARIES_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(OTHER_DIARIES_OK.getMessage()))
                .andDo(document(
                        "Diary 마이리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 다른 유저 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("lastDiaryDate").description("마지막 조회 다이어리 날짜 (yyyy-mm-dd)"),
                                        parameterWithName("sort").description("정렬 (diaryDate 또는 diaryDate,desc)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                getDiaryListFields("body.diaryList.").toArray(new FieldDescriptor[0])
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 다른 유저 리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 다이어리_월간_마이리스트_조회_성공() throws Exception {
        List<DiaryMonthlyDto> diaryList = new ArrayList<>();
        diaryList.add(new DiaryMonthlyDto(124L, LocalDate.parse("2024-07-01"), "http://youniform.com/sticker1.png"));
        diaryList.add(new DiaryMonthlyDto(125L, LocalDate.parse("2024-07-12"), "http://youniform.com/sticker1.png"));
        diaryList.add(new DiaryMonthlyDto(123L, LocalDate.parse("2024-07-31"), "http://youniform.com/sticker1.png"));

        when(diaryService.findMyMonthlyDiaries(anyLong(), any())).thenReturn(new DiaryMonthlyListRes(diaryList));

        ResultActions actions = mockMvc.perform(
                get("/diaries/monthly")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("calendarDate", "2024-07"));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MY_MONTHLY_DIARIES_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MY_MONTHLY_DIARIES_OK.getMessage()))
                .andDo(document(
                        "Diary 월간 마이리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 월간 마이리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("calendarDate").description("다이어리 조회할 월간 yyyy-mm)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.diaryList[]").type(JsonFieldType.ARRAY).description("월간 다이어리 리스트"),
                                                fieldWithPath("body.*[].diaryId").type(JsonFieldType.NUMBER).description("다이어리 ID"),
                                                fieldWithPath("body.*[].diaryDate").type(JsonFieldType.STRING).description("다이어리 작성일"),
                                                fieldWithPath("body.*[].stampImgUrl").type(JsonFieldType.STRING).description("다이어리 스탬프 URL")
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 월간 마이리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 다이어리_월간_마이리스트_조회_실패_잘못된_날짜_형식() throws Exception {
        List<DiaryMonthlyDto> diaryList = new ArrayList<>();
        diaryList.add(new DiaryMonthlyDto(124L, LocalDate.parse("2024-07-01"), "http://youniform.com/sticker1.png"));
        diaryList.add(new DiaryMonthlyDto(125L, LocalDate.parse("2024-07-12"), "http://youniform.com/sticker1.png"));
        diaryList.add(new DiaryMonthlyDto(123L, LocalDate.parse("2024-07-31"), "http://youniform.com/sticker1.png"));

        when(diaryService.findMyMonthlyDiaries(anyLong(), any())).thenThrow(new CustomException(INVALID_CALENDAR_DATE));

        ResultActions actions = mockMvc.perform(
                get("/diaries/monthly")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("calendarDate", "2024-07-01"));

        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_CALENDAR_DATE.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_CALENDAR_DATE.getMessage()))
                .andDo(document(
                        "Diary 월간 마이리스트 조회 실패 - 잘못된 캘린더 날짜 형식 (yyyy-mm 형식 맞추기)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 월간 마이리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("calendarDate").description("다이어리 조회할 월간 (yyyy-mm)")
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
    public void 다이어리_월간_리스트_조회_성공() throws Exception {
        List<DiaryMonthlyDto> diaryList = new ArrayList<>();
        diaryList.add(new DiaryMonthlyDto(124L, LocalDate.parse("2024-07-01"), "http://youniform.com/sticker1.png"));
        diaryList.add(new DiaryMonthlyDto(125L, LocalDate.parse("2024-07-12"), "http://youniform.com/sticker1.png"));
        diaryList.add(new DiaryMonthlyDto(123L, LocalDate.parse("2024-07-31"), "http://youniform.com/sticker1.png"));

        when(diaryService.findMonthlyDiaries(anyString(), any())).thenReturn(new DiaryMonthlyListRes(diaryList));

        ResultActions actions = mockMvc.perform(
                get("/diaries/monthly/{userId}", "1604b772-adc0-4212-8a90-81186c57f598")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("calendarDate", "2024-07"));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(OTHER_MONTHLY_DIARIES_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(OTHER_MONTHLY_DIARIES_OK.getMessage()))
                .andDo(document(
                        "Diary 월간 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 월간 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("calendarDate").description("다이어리 조회할 월간 yyyy-mm")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.diaryList[]").type(JsonFieldType.ARRAY).description("월간 다이어리 리스트"),
                                                fieldWithPath("body.*[].diaryId").type(JsonFieldType.NUMBER).description("다이어리 ID"),
                                                fieldWithPath("body.*[].diaryDate").type(JsonFieldType.STRING).description("다이어리 작성일"),
                                                fieldWithPath("body.*[].stampImgUrl").type(JsonFieldType.STRING).description("다이어리 스탬프 URL")
                                        )
                                )
                                .responseSchema(Schema.schema("Diary 월간 리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 다이어리_수정_성공() throws Exception {
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-07-31", getDiaryContentDto(true), "ALL", 1L, "diary image url");

        diaryService.modifyDiary(anyLong(), anyLong(), any(DiaryModifyReq.class));

        performPut("/diaries/{diaryId}", diaryModifyReq, 123L)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_MODIFIED.getMessage()))
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
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-07-31", getDiaryContentDto(true), "ALL", 1L, "diary image url");

        doThrow(new CustomException(DIARY_NOT_FOUND)).when(diaryService).modifyDiary(anyLong(), anyLong(), any(DiaryModifyReq.class));

        performPut("/diaries/{diaryId}", diaryModifyReq, 100L)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_NOT_FOUND.getMessage()))
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
    public void 다이어리_수정_실패_존재하지_않는_스탬프() throws Exception {
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-07-31", getDiaryContentDto(true), "ALL", 100L, "diary image url");

        doThrow(new CustomException(STAMP_NOT_FOUND)).when(diaryService).modifyDiary(anyLong(), anyLong(), any(DiaryModifyReq.class));

        performPut("/diaries/{diaryId}", diaryModifyReq, 123L)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(STAMP_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(STAMP_NOT_FOUND.getMessage()))
                .andDo(document("Diary 수정 실패 - 존재하지 않는 스탬프 (Stamp ID가 유효하지 않음)",
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
    public void 다이어리_수정_실패_작성일_수정_불가() throws Exception {
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-08-01", getDiaryContentDto(true), "ALL", 1L, "diary image url");

        doThrow(new CustomException(DIARY_UPDATE_FORBIDDEN)).when(diaryService).modifyDiary(anyLong(), anyLong(), any(DiaryModifyReq.class));

        performPut("/diaries/{diaryId}", diaryModifyReq, 123L)
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_UPDATE_FORBIDDEN.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_UPDATE_FORBIDDEN.getMessage()))
                .andDo(document("Diary 수정 실패 - 다이어리 작성일 수정 불가",
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
        diaryService.removeDiary(anyLong(), anyLong());

        performDelete("/diaries/{diaryId}", 123L)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_DELETED.getMessage()))
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
        doThrow(new CustomException(DIARY_NOT_FOUND)).when(diaryService).removeDiary(anyLong(), anyLong());

        performDelete("/diaries/{diaryId}", 100L)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_NOT_FOUND.getMessage()))
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
    public void 다이어리_삭제_실패_로그인유저_작성자_불일치() throws Exception {
        doThrow(new CustomException(DIARY_UPDATE_FORBIDDEN)).when(diaryService).removeDiary(anyLong(), anyLong());

        performDelete("/diaries/{diaryId}", 126L)
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_UPDATE_FORBIDDEN.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_UPDATE_FORBIDDEN.getMessage()))
                .andDo(document("Diary 삭제 실패 - 현재 로그인한 유저가 작성한 게시글만 삭제 가능",
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
        List<ResourceDto> resourceList = new ArrayList<>();
        resourceList.add(new ResourceDto("BACKGOUND", List.of(
                new ResourceCategoryDto("NONE", List.of(
                        new ResourceItemDto(1L, "background_1.png"),
                        new ResourceItemDto(2L, "background_2.png")
                )
        ))));
        resourceList.add(new ResourceDto("STICKER", List.of(
                new ResourceCategoryDto("BASEBALL", List.of(
                        new ResourceItemDto(3L, "sticker_baseball.png")
                )),
                new ResourceCategoryDto("RETRO", List.of(
                        new ResourceItemDto(4L, "sticker_retro.png")
                )),
                new ResourceCategoryDto("CUTE", List.of(
                        new ResourceItemDto(5L, "sticker_cute.png")
                )),
                new ResourceCategoryDto("LETTER", List.of(
                        new ResourceItemDto(6L, "sticker_cute.png")
                ))
        )));
        resourceList.add(new ResourceDto("THEME", List.of(
                new ResourceCategoryDto("NONE", List.of(
                        new ResourceItemDto(7L, "theme_1.png"),
                        new ResourceItemDto(8L, "theme_2.png")
                )
                ))));

        when(diaryService.findDiaryResources()).thenReturn(new ResourceListRes(resourceList));

        performGet("/diaries/resources")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_RESOURCES_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_RESOURCES_OK.getMessage()))
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
                                        fieldWithPath("body.resourceList[]").description("Resource 타입별 리스트"),
                                        fieldWithPath("body.resourceList[].type").type(JsonFieldType.STRING).description("Resource 타입명 (BACKGROUND, STICKER, THEME)"),
                                        fieldWithPath("body.resourceList[].categories[]").description("Resource 카테고리별 리스트"),
                                        fieldWithPath("body.resourceList[].categories[].category").type(JsonFieldType.STRING).description("Resource 카테고리명 (NONE, BASEBALL, RETRO, CUTE, LETTER)"),
                                        fieldWithPath("body.resourceList[].categories[].items[]").description("Resource Item 정보"),
                                        fieldWithPath("body.resourceList[].categories[].items[].resourceId").type(JsonFieldType.NUMBER).description("Resource Item Id"),
                                        fieldWithPath("body.resourceList[].categories[].items[].imgUrl").type(JsonFieldType.STRING).description("Resource Item 이미지 URL")
                                )
                                .responseSchema(Schema.schema("Resource 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_스탬프_조회_성공() throws Exception {
        List<StampDto> stampList = new ArrayList<>();
        stampList.add(new StampDto(2L, "http://youniform.com/sticker2.png"));
        stampList.add(new StampDto(3L, "http://youniform.com/sticker3.png"));
        stampList.add(new StampDto(4L, "http://youniform.com/sticker4.png"));

        when(diaryService.findDiaryStamps()).thenReturn(new StampListRes(stampList));

        performGet("/diaries/stamps")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DIARY_STAMP_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DIARY_STAMP_OK.getMessage()))
                .andDo(document(
                        "Stamp 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Stamp 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        fieldWithPath("header.httpStatusCode").type(JsonFieldType.NUMBER).description("응답 코드"),
                                        fieldWithPath("header.message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.stampList[]").description("Stamp 리스트"),
                                        fieldWithPath("body.stampList[].stampId").type(JsonFieldType.NUMBER).description("Stamp ID"),
                                        fieldWithPath("body.stampList[].imgUrl").type(JsonFieldType.STRING).description("Stamp 이미지 URL")
                                )
                                .responseSchema(Schema.schema("Stamp 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

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

    private void setRedisDiaryContent(Long id) throws JsonProcessingException {
        DiaryContentRedisDto redisDto = DiaryContentRedisDto.builder()
                .userId(id)
                .contents(getDiaryContent())
                .build();

        redisUtils.setData("diaryContents_" + id, mapper.writeValueAsString(redisDto));
    }
}
