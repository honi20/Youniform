package com.youniform.api.domain.diary.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;
import com.youniform.api.domain.diary.dto.add.DiaryAddReq;
import com.youniform.api.domain.diary.dto.DiaryContentDto;
import com.youniform.api.domain.diary.dto.DiaryContentObjectDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DiaryController.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("다이어리 API 명세서")
public class DiaryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final static String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    /**
    @Test
    public void diaryAdd() throws Exception {
        // given
        DiaryContentObjectDto type1 = new DiaryContentObjectDto();
        type1.setText("text");
        DiaryContentObjectDto type2 = new DiaryContentObjectDto();
        type2.setSticker("sticker1");
        DiaryContentObjectDto type3 = new DiaryContentObjectDto();
        type3.setImgUrl("imgUrl");
        DiaryContentObjectDto type4 = new DiaryContentObjectDto();
        type4.setSticker("sticker2");

        List<DiaryContentObjectDto> contentTypes = new ArrayList<>();
        contentTypes.add(type1);
        contentTypes.add(type2);
        contentTypes.add(type3);
        contentTypes.add(type4);

        DiaryContentDto diaryContentDto = new DiaryContentDto();
        diaryContentDto.setVersion("6.0.2");
        diaryContentDto.setObjects(contentTypes);

        DiaryAddReq diaryAddReq = new DiaryAddReq();
        diaryAddReq.setContents(diaryContentDto);
        diaryAddReq.setScope("PUBLIC");

        String content = gson.toJson(diaryAddReq);

        ResultActions actions = mockMvc.perform(
                post("/diaries")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions.andExpect(status().isCreated())
                .andDo(document(
                        "Diary 생성",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Diary API")
                                .summary("Diary 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("contents.version").type(JsonFieldType.STRING)
                                                        .description("버전"),
                                                fieldWithPath("contents.objects[]").type(JsonFieldType.ARRAY)
                                                        .description("다이어리 내용 타입"),
                                                fieldWithPath("contents.objects[].text").optional().type(JsonFieldType.STRING)
                                                        .description("텍스트 내용"),
                                                fieldWithPath("contents.objects[].background").optional().type(JsonFieldType.STRING)
                                                        .description("배경 url"),
                                                fieldWithPath("contents.objects[].sticker").optional().type(JsonFieldType.STRING)
                                                        .description("스티커 url"),
                                                fieldWithPath("contents.objects[].theme").optional().type(JsonFieldType.STRING)
                                                        .description("테마"),
                                                fieldWithPath("contents.objects[].imgUrl").optional().type(JsonFieldType.STRING)
                                                        .description("이미지 url"),
                                                fieldWithPath("scope").type(JsonFieldType.STRING)
                                                        .description("공개 범위")
                                        )
                                )
                                .responseFields(
                                        List.of(
                                                fieldWithPath("header.httpStatusCode").type(JsonFieldType.NUMBER)
                                                        .description("성공 코드"),
                                                fieldWithPath("header.message").type(JsonFieldType.STRING)
                                                        .description("성공 메시지"),
                                                fieldWithPath("body.diaryId").type(JsonFieldType.NUMBER)
                                                        .description("Diary Id")
                                        )
                                )
                                .requestSchema(Schema.schema("Diary 생성 Request"))
                                .responseSchema(Schema.schema("Diary 생성 Response"))
                                .build()
                        ))
                );


    }
     */
}
