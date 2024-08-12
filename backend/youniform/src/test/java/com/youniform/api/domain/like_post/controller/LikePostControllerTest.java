package com.youniform.api.domain.like_post.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;
import com.youniform.api.domain.like_post.dto.PostLikeReq;
import com.youniform.api.global.jwt.service.JwtService;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.SuccessCode.LIKES_STATUS_OK;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("커뮤니티 - 좋아요 API 명세서")
@WithMockUser
public class LikePostControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f10046564";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtService jwtService;

    @Autowired
    private Gson gson;

    @Test
    public void 좋아요_상태_반영_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        PostLikeReq postLikeReq = new PostLikeReq();
        postLikeReq.setIsLiked(true);

        String content = gson.toJson(postLikeReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/api/likes/{postId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LIKES_STATUS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LIKES_STATUS_OK.getMessage()))
                .andDo(document(
                        "좋아요 상태 반영 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Likes API")
                                .summary("좋아요 상태 반영 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("isLiked").type(JsonFieldType.BOOLEAN)
                                                .description("반영할 상태")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").optional().description("없음")
                                        )
                                )
                                .responseSchema(Schema.schema("좋아요 상태 Response"))
                                .build()
                        ))
                );

    }
}