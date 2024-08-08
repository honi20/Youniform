package com.youniform.api.domain.comment.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;
import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;
import com.youniform.api.domain.comment.dto.CommentModifyReq;
import com.youniform.api.domain.comment.dto.CommentModifyRes;
import com.youniform.api.domain.comment.service.CommentService;
import com.youniform.api.global.exception.CustomException;
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
import static com.youniform.api.global.statuscode.ErrorCode.*;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.any;
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
@DisplayName("커뮤니티 - 댓글 API 명세서")
@WithMockUser
public class CommentControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private CommentService commentService;

    @Test
    public void 댓글_생성_성공() throws Exception {
        //given
        CommentAddReq commentAddReq = new CommentAddReq();
        commentAddReq.setContents("도영이 귀여워");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(commentAddReq);

        when(commentService.addComment(any(), any(), any()))
                .thenReturn(new CommentAddRes(3L, "s3 url", "nickname",
                        UUID, "댓글 내용", "0 초전"));

        //when
        ResultActions actions = mockMvc.perform(
                post("/comments/{postId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(COMMENT_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(COMMENT_CREATED.getMessage()))
                .andDo(document(
                        "Comment 생성 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("contents").type(JsonFieldType.STRING)
                                                .description("댓글 내용")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.commentId").type(JsonFieldType.NUMBER)
                                                                .description("댓글 ID"),
                                                fieldWithPath("body.nickname").type(JsonFieldType.STRING)
                                                                .description("작성자 닉네임"),
                                                fieldWithPath("body.imgUrl").type(JsonFieldType.STRING)
                                                                .description("작성자 프로필 이미지 Url"),
                                                fieldWithPath("body.userId").type(JsonFieldType.STRING)
                                                                .description("작성자 Id(UUID)"),
                                                fieldWithPath("body.contents").type(JsonFieldType.STRING)
                                                        .description("댓글 내용"),
                                                fieldWithPath("body.createdAt").type(JsonFieldType.STRING)
                                                        .description("생성 날짜")
                                        )
                                )
                                .requestSchema(Schema.schema("Comment 생성 Request"))
                                .responseSchema(Schema.schema("Comment 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 댓글_생성_실패_유효하지_않은_게시글_아이디() throws Exception {
        //given
        CommentAddReq commentAddReq = new CommentAddReq();
        commentAddReq.setContents("도영이 귀여워");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(commentAddReq);

        when(commentService.addComment(any(), any(), any()))
                .thenThrow(new CustomException(POST_NOT_FOUND));

        ResultActions actions = mockMvc.perform(
                post("/comments/{postId}", 10000L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );


        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_NOT_FOUND.getMessage()))
                .andDo(document(
                        "Comment 생성 실패 - 유효하지 않은 게시글 ID",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("contents").type(JsonFieldType.STRING)
                                                .description("댓글 내용")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body")
                                                        .description("없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Comment 생성 Request"))
                                .responseSchema(Schema.schema("Comment 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 댓글_생성_실패_댓글이_공백인_경우() throws Exception {
        //given
        CommentAddReq commentAddReq = new CommentAddReq();
        commentAddReq.setContents("        ");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(commentAddReq);

        when(commentService.addComment(any(), any(), any()))
                .thenThrow(new CustomException(INVALID_COMMENT_CONTENTS));

        ResultActions actions = mockMvc.perform(
                post("/comments/{postId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );


        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_COMMENT_CONTENTS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_COMMENT_CONTENTS.getMessage()))
                .andDo(document(
                        "Comment 생성 실패 - 댓글이 공백이거나 null인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("contents").type(JsonFieldType.STRING)
                                                .description("댓글 내용")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body")
                                                        .description("없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Comment 생성 Request"))
                                .responseSchema(Schema.schema("Comment 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 댓글_수정_성공() throws Exception {
        //given
        CommentModifyReq commentModifyReq = new CommentModifyReq();
        commentModifyReq.setContents("댓글 수정예시 11111");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(commentModifyReq);

        when(commentService.modifyComment(any(), any(), any()))
                .thenReturn(new CommentModifyRes("수정", "0초 전"));

        //when
        ResultActions actions = mockMvc.perform(
                patch("/comments/{commentId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(COMMENT_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(COMMENT_MODIFIED.getMessage()))
                .andDo(document(
                        "Comment 수정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("contents").type(JsonFieldType.STRING)
                                                .description("댓글 수정 내용")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.contents").type(JsonFieldType.STRING)
                                                        .description("댓글 내용"),
                                                fieldWithPath("body.updateAt").type(JsonFieldType.STRING)
                                                        .description("수정 날짜")
                                        )
                                )
                                .requestSchema(Schema.schema("Comment 수정 Request"))
                                .responseSchema(Schema.schema("Comment 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 댓글_수정_실패_유효하지_않은_댓글_아이디() throws Exception {
        //given
        CommentModifyReq commentModifyReq = new CommentModifyReq();
        commentModifyReq.setContents("댓글수정");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(commentModifyReq);

        when(commentService.modifyComment(any(), any(), any()))
                .thenThrow(new CustomException(COMMENT_NOT_FOUND));

        ResultActions actions = mockMvc.perform(
                patch("/comments/{commentId}", 10000L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(COMMENT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(COMMENT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "Comment 수정 실패 - 유효하지 않은 댓글 ID",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("contents").type(JsonFieldType.STRING)
                                                .description("댓글 수정 내용")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Comment 수정 Request"))
                                .responseSchema(Schema.schema("Comment 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 댓글_수정_실패_댓글이_공백인_경우() throws Exception {
        //given
        CommentModifyReq commentModifyReq = new CommentModifyReq();
        commentModifyReq.setContents(" ");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(commentModifyReq);

        when(commentService.modifyComment(any(), any(), any()))
                .thenThrow(new CustomException(INVALID_COMMENT_CONTENTS));

        ResultActions actions = mockMvc.perform(
                patch("/comments/{commentId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_COMMENT_CONTENTS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_COMMENT_CONTENTS.getMessage()))
                .andDo(document(
                        "Comment 수정 실패 - 댓글이 공백이거나 null인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("contents").type(JsonFieldType.STRING)
                                                .description("댓글 수정 내용")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Comment 수정 Request"))
                                .responseSchema(Schema.schema("Comment 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 댓글_수정_실패_나의_댓글이_아닌_경우() throws Exception {
        //given
        CommentModifyReq commentModifyReq = new CommentModifyReq();
        commentModifyReq.setContents("댓글 수정");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(commentModifyReq);

        when(commentService.modifyComment(any(), any(), any()))
                .thenThrow(new CustomException(COMMENT_UPDATE_FORBIDDEN));

        ResultActions actions = mockMvc.perform(
                patch("/comments/{commentId}", 2L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(COMMENT_UPDATE_FORBIDDEN.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(COMMENT_UPDATE_FORBIDDEN.getMessage()))
                .andDo(document(
                        "Comment 수정 실패 - 나의 댓글이 아닌 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("contents").type(JsonFieldType.STRING)
                                                .description("댓글 수정 내용")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Comment 수정 Request"))
                                .responseSchema(Schema.schema("Comment 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 댓글_삭제_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                delete("/comments/{commentId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(COMMENT_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(COMMENT_DELETED.getMessage()))
                .andDo(document(
                        "Comment 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Comment API")
                                .summary("Comment 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").optional().description("없음")
                                        )
                                )
                                .responseSchema(Schema.schema("Comment 삭제 Response"))
                                .build()
                        ))
                );
    }
}
