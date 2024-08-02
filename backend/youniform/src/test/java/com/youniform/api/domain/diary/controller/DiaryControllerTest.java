package com.youniform.api.domain.diary.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.config.RedisTestContainerConfig;
import com.youniform.api.domain.diary.dto.*;
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
@ExtendWith(RedisTestContainerConfig.class)
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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(true), "ALL", 1L);

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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07", getDiaryContentDto(true), "ALL", 1L);

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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(false), "ALL", 1L);

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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(true), "ONLY_ME", 1L);

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
        DiaryAddReq diaryAddReq = new DiaryAddReq("2024-07-27", getDiaryContentDto(true), "ALL", 100L);

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
        DiaryDetailDto diaryDetailDto = new DiaryDetailDto(123L, "User1", LocalDate.parse("2024-07-31"), getDiaryContent(), Scope.FRIENDS, "http://youniform.com/sticker1.png", "s3 url");

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
        List<DiaryDetailDto> diaryList = new ArrayList<>();
        diaryList.add(new DiaryDetailDto(123L, "User1", LocalDate.parse("2024-07-31"), getDiaryContent(), Scope.FRIENDS, "http://youniform.com/sticker1.png", "s3 url"));
        diaryList.add(new DiaryDetailDto(125L, "User1", LocalDate.parse("2024-07-12"), getDiaryContent(), Scope.PRIVATE, "http://youniform.com/sticker1.png", "s3 url"));
        diaryList.add(new DiaryDetailDto(124L, "User1", LocalDate.parse("2024-07-01"), getDiaryContent(), Scope.ALL, "http://youniform.com/sticker1.png", "s3 url"));

        PageRequest pageRequest = PageRequest.of(0, 10);
        SliceDto<DiaryDetailDto> sliceDto = new SliceDto<>(new SliceImpl<>(diaryList, pageRequest, false));
        DiaryListRes response = new DiaryListRes(sliceDto);

        when(diaryService.listMyDiary(anyLong(), any(), any())).thenReturn(response);

        ResultActions actions = mockMvc.perform(
                get("/diaries/list")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("lastDiaryId", "")
                        .param("page", "0")
                        .param("size", "10")
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
        List<DiaryDetailDto> diaryList = new ArrayList<>();
        diaryList.add(new DiaryDetailDto(123L, "User1", LocalDate.parse("2024-07-31"), getDiaryContent(), Scope.FRIENDS, "http://youniform.com/sticker1.png", "s3 url"));
        diaryList.add(new DiaryDetailDto(125L, "User1", LocalDate.parse("2024-07-12"), getDiaryContent(), Scope.PRIVATE, "http://youniform.com/sticker1.png", "s3 url"));
        diaryList.add(new DiaryDetailDto(124L, "User1", LocalDate.parse("2024-07-01"), getDiaryContent(), Scope.ALL, "http://youniform.com/sticker1.png", "s3 url"));

        PageRequest pageRequest = PageRequest.of(0, 10);
        SliceDto<DiaryDetailDto> sliceDto = new SliceDto<>(new SliceImpl<>(diaryList, pageRequest, false));
        DiaryListRes response = new DiaryListRes(sliceDto);

        when(diaryService.listDiary(anyString(), any(), any())).thenReturn(response);

        ResultActions actions = mockMvc.perform(
                get("/diaries/list/{userId}", "1604b772-adc0-4212-8a90-81186c57f598")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("lastDiaryId", "")
                        .param("page", "0")
                        .param("size", "10")
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
                                .summary("Diary 마이리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
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
    public void 다이어리_수정_성공() throws Exception {
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-07-31", getDiaryContentDto(true), "ALL", 1L);

        diaryService.modifyDiary(anyLong(), anyLong(), any(DiaryModifyReq.class));

        performPut("/diaries/{diaryId}", diaryModifyReq, 123L)
                .andExpect(status().isNoContent())
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
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-07-31", getDiaryContentDto(true), "ALL", 1L);

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
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-07-31", getDiaryContentDto(true), "ALL", 100L);

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
        DiaryModifyReq diaryModifyReq = new DiaryModifyReq("2024-08-01", getDiaryContentDto(true), "ALL", 1L);

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
                .andExpect(status().isNoContent())
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
