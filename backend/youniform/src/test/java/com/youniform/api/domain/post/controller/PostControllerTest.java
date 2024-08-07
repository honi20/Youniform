package com.youniform.api.domain.post.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.epages.restdocs.apispec.SimpleType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.youniform.api.domain.comment.dto.CommentDto;
import com.youniform.api.domain.post.dto.*;
import com.youniform.api.domain.post.service.PostService;
import com.youniform.api.domain.tag.dto.TagDto;
import com.youniform.api.global.dto.SliceDto;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.ErrorCode.*;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("커뮤니티 - 게시글 API 명세서")
@WithMockUser
public class PostControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private PostService postService;

    @Test
    public void 게시글_생성_성공() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");

        PostAddReq postAddReq = new PostAddReq();
        postAddReq.setContents("테스트111");
        postAddReq.setTags(tagList);

        List<TagDto> tagDtoList = new ArrayList<>();
        tagDtoList.add(TagDto.builder()
                        .tagId(1L)
                        .contents("김도영")
                .build());
        tagDtoList.add(TagDto.builder()
                .tagId(2L)
                .contents("김도영")
                .build());
        tagDtoList.add(TagDto.builder()
                .tagId(3L)
                .contents("김도영")
                .build());
        tagDtoList.add(TagDto.builder()
                .tagId(4L)
                .contents("김도영")
                .build());

        when(postService.addPost(any(), any(), any()))
                .thenReturn(new PostAddRes(1L));

        String jwtToken = jwtService.createAccessToken(UUID);

        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", new ObjectMapper().writeValueAsBytes(postAddReq));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts")
                        .file(file)
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_CREATED.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 생성 성공(파일 있는 게시글)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 생성 Request"))
                                .responseSchema(Schema.schema("Post 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 파일_없는_게시글_생성_성공() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");

        PostAddReq postAddReq = new PostAddReq();
        postAddReq.setContents("테스트111");
        postAddReq.setTags(tagList);

        List<TagDto> tagDtoList = new ArrayList<>();
        tagDtoList.add(TagDto.builder()
                .tagId(1L)
                .contents("김도영")
                .build());
        tagDtoList.add(TagDto.builder()
                .tagId(2L)
                .contents("김도영")
                .build());
        tagDtoList.add(TagDto.builder()
                .tagId(3L)
                .contents("김도영")
                .build());
        tagDtoList.add(TagDto.builder()
                .tagId(4L)
                .contents("김도영")
                .build());

        when(postService.addPost(any(), any(), any()))
                .thenReturn(new PostAddRes(1L));

        String jwtToken = jwtService.createAccessToken(UUID);

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", new ObjectMapper().writeValueAsBytes(postAddReq));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts")
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_CREATED.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 생성 성공(파일 없는 게시글)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 생성 Request"))
                                .responseSchema(Schema.schema("Post 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_생성_실패_태그_개수_초과() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");
        tagList.add("도영이짱");
        tagList.add("도영이짱짱");
        tagList.add("도영이짱짱짱");
        tagList.add("도영이짱짱짱짱");
        tagList.add("도영이짱짱짱짱짱");
        tagList.add("도영이얍얍");
        tagList.add("도영이멋쟁이");

        PostAddReq postAddReq = new PostAddReq();
        postAddReq.setContents("테스트111");
        postAddReq.setTags(tagList);

        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.addPost(any(), any(), any()))
                .thenThrow(new CustomException(INVALID_TAG_SIZE));

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", new ObjectMapper().writeValueAsBytes(postAddReq));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts")
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_TAG_SIZE.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_TAG_SIZE.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 생성 실패 - 태그 개수 초과(10개 초과)인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 생성 Request"))
                                .responseSchema(Schema.schema("Post 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_생성_실패_태그_길이_초과() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");
        tagList.add("도영이짱짱짱짱짱멋쟁이울트라캡숑");

        PostAddReq postAddReq = new PostAddReq();
        postAddReq.setContents("테스트111");
        postAddReq.setTags(tagList);

        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.addPost(any(), any(), any()))
                .thenThrow(new CustomException(INVALID_TAG_CONTENTS));

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", new ObjectMapper().writeValueAsBytes(postAddReq));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts")
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_TAG_CONTENTS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_TAG_CONTENTS.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 생성 실패 - 태그 길이 초과(10자 초과)인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 생성 Request"))
                                .responseSchema(Schema.schema("Post 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전체_게시글_목록_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);
        List<TagDto> tags = new ArrayList<>();
        tags.add(TagDto.builder()
                        .contents("태그1")
                        .tagId(1L)
                .build());

        List<PostDto> result = new ArrayList<>();
        result.add(PostDto.builder()
                    .postId(1L)
                    .profileImg("s3 img")
                    .userId(UUID)
                    .nickname("nickname")
                    .contents("게시글 내용")
                    .commentCount(3L)
                    .createdAt(LocalDate.now())
                    .isLiked(false)
                    .tags(tags)
                    .imageUrl("s3 url")
                .build());
        result.add(PostDto.builder()
                    .postId(1L)
                    .profileImg("s3 img")
                    .userId(UUID)
                    .nickname("nickname")
                    .contents("게시글 내용")
                    .commentCount(3L)
                    .createdAt(LocalDate.now())
                    .isLiked(false)
                    .tags(tags)
                    .imageUrl("s3 url")
                .build());

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>();
        postDtoSliceDto.setContent(result);
        postDtoSliceDto.setPage(1);
        postDtoSliceDto.setSize(10);
        postDtoSliceDto.setHasNext(false);

        when(postService.findPublicPosts(any(), any(), any()))
                .thenReturn(new PostListRes(postDtoSliceDto));

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("lastPostId", "")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PUBLIC_POST_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PUBLIC_POST_LIST_OK.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "전체 Post 목록 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("전체 Post 목록 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("lastPostId").description("마지막 Post Id (Optional)").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postList.content").type(JsonFieldType.ARRAY)
                                                        .description("게시글 목록"),
                                                fieldWithPath("body.postList.page").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 번호"),
                                                fieldWithPath("body.postList.size").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 사이즈"),
                                                fieldWithPath("body.postList.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 슬라이스 여부"),
                                                fieldWithPath("body.postList.*[].postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID"),
                                                fieldWithPath("body.postList.*[].userId").type(JsonFieldType.STRING)
                                                        .description("유저 Id(UUID)"),
                                                fieldWithPath("body.postList.*[].profileImg").type(JsonFieldType.STRING)
                                                        .description("작성자 프로필 사진 url"),
                                                fieldWithPath("body.postList.*[].nickname").type(JsonFieldType.STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.postList.*[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("게시글에 삽입된 이미지 url"),
                                                fieldWithPath("body.postList.*[].contents").type(JsonFieldType.STRING)
                                                        .description("게시글 내용"),
                                                fieldWithPath("body.postList.*[].tags[].tagId").type(JsonFieldType.NUMBER)
                                                        .description("태그 Id"),
                                                fieldWithPath("body.postList.*[].tags[].contents").type(JsonFieldType.STRING)
                                                        .description("태그 이름"),
                                                fieldWithPath("body.postList.*[].createdAt").type(JsonFieldType.STRING)
                                                        .description("작성 일자"),
                                                fieldWithPath("body.postList.*[].commentCount").type(JsonFieldType.NUMBER)
                                                        .description("댓글 개수"),
                                                fieldWithPath("body.postList.*[].isLiked").type(JsonFieldType.BOOLEAN)
                                                        .description("좋아요 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("전체 Post 목록 조회 Request"))
                                .responseSchema(Schema.schema("전체 Post 목록 조회 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 나의_게시글_목록_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);
        List<TagDto> tags = new ArrayList<>();
        tags.add(TagDto.builder()
                .contents("태그1")
                .tagId(1L)
                .build());

        List<PostDto> result = new ArrayList<>();
        result.add(PostDto.builder()
                .postId(1L)
                .profileImg("s3 img")
                .userId(UUID)
                .nickname("nickname")
                .contents("게시글 내용")
                .commentCount(3L)
                .createdAt(LocalDate.now())
                .isLiked(false)
                .tags(tags)
                .imageUrl("s3 url")
                .build());
        result.add(PostDto.builder()
                .postId(1L)
                .profileImg("s3 img")
                .userId(UUID)
                .nickname("nickname")
                .contents("게시글 내용")
                .commentCount(3L)
                .createdAt(LocalDate.now())
                .isLiked(false)
                .tags(tags)
                .imageUrl("s3 url")
                .build());

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>();
        postDtoSliceDto.setContent(result);
        postDtoSliceDto.setPage(1);
        postDtoSliceDto.setSize(10);
        postDtoSliceDto.setHasNext(false);

        when(postService.findMyPosts(any(), any(), any()))
                .thenReturn(new PostListRes(postDtoSliceDto));

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts/list")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("lastPostId", "")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MY_POST_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MY_POST_LIST_OK.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "나의 Post 목록 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("나의 Post 목록 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("lastPostId").description("마지막 Post Id (Optional)").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postList.content").type(JsonFieldType.ARRAY)
                                                        .description("게시글 목록"),
                                                fieldWithPath("body.postList.page").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 번호"),
                                                fieldWithPath("body.postList.size").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 사이즈"),
                                                fieldWithPath("body.postList.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 슬라이스 여부"),
                                                fieldWithPath("body.postList.*[].postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID"),
                                                fieldWithPath("body.postList.*[].userId").type(JsonFieldType.STRING)
                                                        .description("유저 Id(UUID)"),
                                                fieldWithPath("body.postList.*[].profileImg").type(JsonFieldType.STRING)
                                                        .description("작성자 프로필 사진 url"),
                                                fieldWithPath("body.postList.*[].nickname").type(JsonFieldType.STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.postList.*[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("게시글에 삽입된 이미지 url"),
                                                fieldWithPath("body.postList.*[].contents").type(JsonFieldType.STRING)
                                                        .description("게시글 내용"),
                                                fieldWithPath("body.postList.*[].tags[].tagId").type(JsonFieldType.NUMBER)
                                                        .description("태그 Id"),
                                                fieldWithPath("body.postList.*[].tags[].contents").type(JsonFieldType.STRING)
                                                        .description("태그 이름"),
                                                fieldWithPath("body.postList.*[].createdAt").type(JsonFieldType.STRING)
                                                        .description("작성 일자"),
                                                fieldWithPath("body.postList.*[].commentCount").type(JsonFieldType.NUMBER)
                                                        .description("댓글 개수"),
                                                fieldWithPath("body.postList.*[].isLiked").type(JsonFieldType.BOOLEAN)
                                                        .description("좋아요 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("나의 Post 목록 조회 Request"))
                                .responseSchema(Schema.schema("나의 Post 목록 조회 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 친구_게시글_목록_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);
        List<TagDto> tags = new ArrayList<>();
        tags.add(TagDto.builder()
                .contents("태그1")
                .tagId(1L)
                .build());

        List<PostDto> result = new ArrayList<>();
        result.add(PostDto.builder()
                .postId(1L)
                .profileImg("s3 img")
                .userId(UUID)
                .nickname("nickname")
                .contents("게시글 내용")
                .commentCount(3L)
                .createdAt(LocalDate.now())
                .isLiked(false)
                .tags(tags)
                .imageUrl("s3 url")
                .build());
        result.add(PostDto.builder()
                .postId(1L)
                .profileImg("s3 img")
                .userId(UUID)
                .nickname("nickname")
                .contents("게시글 내용")
                .commentCount(3L)
                .createdAt(LocalDate.now())
                .isLiked(false)
                .tags(tags)
                .imageUrl("s3 url")
                .build());

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>();
        postDtoSliceDto.setContent(result);
        postDtoSliceDto.setPage(1);
        postDtoSliceDto.setSize(10);
        postDtoSliceDto.setHasNext(false);

        when(postService.findFriendPost(any(), any(), any(), any()))
                .thenReturn(new PostListRes(postDtoSliceDto));

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts/friends/{userId}", UUID)
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("lastPostId", "")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_POST_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_POST_LIST_OK.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "친구 Post 목록 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("친구 Post 목록 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("lastPostId").description("마지막 Post Id (Optional)").optional(),
                                        parameterWithName("userId").description("친구 Id(UUID)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postList.content").type(JsonFieldType.ARRAY)
                                                        .description("게시글 목록"),
                                                fieldWithPath("body.postList.page").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 번호"),
                                                fieldWithPath("body.postList.size").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 사이즈"),
                                                fieldWithPath("body.postList.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 슬라이스 여부"),
                                                fieldWithPath("body.postList.*[].postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID"),
                                                fieldWithPath("body.postList.*[].userId").type(JsonFieldType.STRING)
                                                        .description("유저 Id(UUID)"),
                                                fieldWithPath("body.postList.*[].profileImg").type(JsonFieldType.STRING)
                                                        .description("작성자 프로필 사진 url"),
                                                fieldWithPath("body.postList.*[].nickname").type(JsonFieldType.STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.postList.*[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("게시글에 삽입된 이미지 url"),
                                                fieldWithPath("body.postList.*[].contents").type(JsonFieldType.STRING)
                                                        .description("게시글 내용"),
                                                fieldWithPath("body.postList.*[].tags[].tagId").type(JsonFieldType.NUMBER)
                                                        .description("태그 Id"),
                                                fieldWithPath("body.postList.*[].tags[].contents").type(JsonFieldType.STRING)
                                                        .description("태그 이름"),
                                                fieldWithPath("body.postList.*[].createdAt").type(JsonFieldType.STRING)
                                                        .description("작성 일자"),
                                                fieldWithPath("body.postList.*[].commentCount").type(JsonFieldType.NUMBER)
                                                        .description("댓글 개수"),
                                                fieldWithPath("body.postList.*[].isLiked").type(JsonFieldType.BOOLEAN)
                                                        .description("좋아요 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("친구 Post 목록 조회 Request"))
                                .responseSchema(Schema.schema("친구 Post 목록 조회 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 게시글_목록_조회_실패_유효하지_않은_친구_아이디() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.findFriendPost(any(), any(), any(), any()))
                .thenThrow(new CustomException(FRIEND_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts/friends/{userId}", "dfsdfds0sg-4r43rdsfgdsf-dfsfgvdsgv")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_NOT_FOUND.getMessage()))
                .andDo(print())
                .andDo(MockMvcRestDocumentation.document(
                        "친구 Post 목록 조회 실패 - 유효하지 않은 친구 ID",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("친구 Post 목록 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("lastPostId").description("마지막 Post Id (Optional)").optional(),
                                        parameterWithName("userId").description("친구 Id(UUID)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("친구 Post 목록 조회 Request"))
                                .responseSchema(Schema.schema("친구 Post 목록 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 좋아요한_게시글_목록_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);
        List<TagDto> tags = new ArrayList<>();
        tags.add(TagDto.builder()
                .contents("태그1")
                .tagId(1L)
                .build());

        List<PostDto> result = new ArrayList<>();
        result.add(PostDto.builder()
                .postId(1L)
                .profileImg("s3 img")
                .userId(UUID)
                .nickname("nickname")
                .contents("게시글 내용")
                .commentCount(3L)
                .createdAt(LocalDate.now())
                .isLiked(true)
                .tags(tags)
                .imageUrl("s3 url")
                .build());
        result.add(PostDto.builder()
                .postId(1L)
                .profileImg("s3 img")
                .userId(UUID)
                .nickname("nickname")
                .contents("게시글 내용")
                .commentCount(3L)
                .createdAt(LocalDate.now())
                .isLiked(true)
                .tags(tags)
                .imageUrl("s3 url")
                .build());

        SliceDto<PostDto> postDtoSliceDto = new SliceDto<>();
        postDtoSliceDto.setContent(result);
        postDtoSliceDto.setPage(1);
        postDtoSliceDto.setSize(10);
        postDtoSliceDto.setHasNext(false);


        when(postService.findLikedPost(any(), any(), any()))
                .thenReturn(new PostListRes(postDtoSliceDto));

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts/likes")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("lastPostId", "")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LIKED_POST_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LIKED_POST_LIST_OK.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "좋아요한 Post 목록 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("좋아요한 Post 목록 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("lastPostId").description("마지막 Post Id (Optional)").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postList.content").type(JsonFieldType.ARRAY)
                                                        .description("게시글 목록"),
                                                fieldWithPath("body.postList.page").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 번호"),
                                                fieldWithPath("body.postList.size").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 사이즈"),
                                                fieldWithPath("body.postList.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 슬라이스 여부"),
                                                fieldWithPath("body.postList.*[].postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID"),
                                                fieldWithPath("body.postList.*[].userId").type(JsonFieldType.STRING)
                                                        .description("유저 Id(UUID)"),
                                                fieldWithPath("body.postList.*[].profileImg").type(JsonFieldType.STRING)
                                                        .description("작성자 프로필 사진 url"),
                                                fieldWithPath("body.postList.*[].nickname").type(JsonFieldType.STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.postList.*[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("게시글에 삽입된 이미지 url"),
                                                fieldWithPath("body.postList.*[].contents").type(JsonFieldType.STRING)
                                                        .description("게시글 내용"),
                                                fieldWithPath("body.postList.*[].tags[].tagId").type(JsonFieldType.NUMBER)
                                                        .description("태그 Id"),
                                                fieldWithPath("body.postList.*[].tags[].contents").type(JsonFieldType.STRING)
                                                        .description("태그 이름"),
                                                fieldWithPath("body.postList.*[].createdAt").type(JsonFieldType.STRING)
                                                        .description("작성 일자"),
                                                fieldWithPath("body.postList.*[].commentCount").type(JsonFieldType.NUMBER)
                                                        .description("댓글 개수"),
                                                fieldWithPath("body.postList.*[].isLiked").type(JsonFieldType.BOOLEAN)
                                                        .description("좋아요 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("좋아요한 Post 목록 조회 Request"))
                                .responseSchema(Schema.schema("좋아요한 Post 목록 조회 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 태그가_포함된_게시글_목록_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts/tags")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("lastPostId", "")
                        .param("name", "김도영")
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(TAG_POST_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(TAG_POST_LIST_OK.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "태그가 포함된 Post 목록 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("태그가 포함된 Post 목록 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("lastPostId").description("마지막 Post Id (Optional)").optional(),
                                        parameterWithName("name").description("태그 이름")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postList.content").type(JsonFieldType.ARRAY)
                                                        .description("게시글 목록"),
                                                fieldWithPath("body.postList.page").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 번호"),
                                                fieldWithPath("body.postList.size").type(JsonFieldType.NUMBER)
                                                        .description("슬라이스 사이즈"),
                                                fieldWithPath("body.postList.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 슬라이스 여부"),
                                                fieldWithPath("body.postList.*[].userId").type(JsonFieldType.STRING)
                                                        .description("유저 Id(UUID)"),
                                                fieldWithPath("body.postList.*[].postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID"),
                                                fieldWithPath("body.postList.*[].profileImg").type(JsonFieldType.STRING)
                                                        .description("작성자 프로필 사진 url"),
                                                fieldWithPath("body.postList.*[].nickname").type(JsonFieldType.STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.postList.*[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("게시글에 삽입된 이미지 url"),
                                                fieldWithPath("body.postList.*[].contents").type(JsonFieldType.STRING)
                                                        .description("게시글 내용"),
                                                fieldWithPath("body.postList.*[].tags[].tagId").type(JsonFieldType.NUMBER)
                                                        .description("태그 Id"),
                                                fieldWithPath("body.postList.*[].tags[].contents").type(JsonFieldType.STRING)
                                                        .description("태그 이름"),
                                                fieldWithPath("body.postList.*[].createdAt").type(JsonFieldType.STRING)
                                                        .description("작성 일자"),
                                                fieldWithPath("body.postList.*[].commentCount").type(JsonFieldType.NUMBER)
                                                        .description("댓글 개수"),
                                                fieldWithPath("body.postList.*[].isLiked").type(JsonFieldType.BOOLEAN)
                                                        .description("좋아요 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("좋아요한 Post 목록 조회 Request"))
                                .responseSchema(Schema.schema("좋아요한 Post 목록 조회 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 게시글_상세_조회_성공() throws Exception {
        //given
        List<TagDto> tags = new ArrayList<>();
        tags.add(TagDto.builder()
                    .tagId(1L)
                    .contents("최강")
                .build());
        tags.add(TagDto.builder()
                .tagId(2L)
                .contents("몬스터즈")
                .build());
        tags.add(TagDto.builder()
                .tagId(3L)
                .contents("최고")
                .build());
        tags.add(TagDto.builder()
                .tagId(4L)
                .contents("홈런")
                .build());

        List<CommentDto> comments = new ArrayList<>();
        comments.add(CommentDto.builder()
                        .commentId(1L)
                        .contents("멋져요")
                        .createdAt("2시간 전")
                        .updatedAt(null)
                        .userId(UUID)
                        .imgUrl("https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png")
                        .nickname("User1")
                .build());
        comments.add(CommentDto.builder()
                .commentId(2L)
                .contents("응원합니다")
                .createdAt("1시간 전")
                .updatedAt("5분 전")
                .userId("1604b772-adc0-4212-8a90-81186c57f100")
                .imgUrl("https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png")
                .nickname("User2")
                .build());

        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.findPost(any(), any()))
                .thenReturn(new PostDetailsRes(1L, UUID, "https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png",
                        "User1", "https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png",
                        "최강 몬스터즈 진짜 최고!!'", tags, LocalDate.now(), true, comments, true));

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts/{postId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_DETAILS_OK.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "Post 상세 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 상세 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("postId").type(SimpleType.NUMBER)
                                                .description("조회할 post Id")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID"),
                                                fieldWithPath("body.profileImg").type(JsonFieldType.STRING)
                                                        .description("작성자 프로필 사진 url"),
                                                fieldWithPath("body.nickname").type(JsonFieldType.STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.userId").type(JsonFieldType.STRING)
                                                        .description("유저 Id(UUID)"),
                                                fieldWithPath("body.contents").type(JsonFieldType.STRING)
                                                        .description("본문 내용"),
                                                fieldWithPath("body.tags[].tagId").type(JsonFieldType.NUMBER)
                                                        .description("태그 Id"),
                                                fieldWithPath("body.tags[].contents").type(JsonFieldType.STRING)
                                                        .description("태그 이름"),
                                                fieldWithPath("body.imageUrl").type(JsonFieldType.STRING)
                                                        .description("게시글에 삽입된 이미지 url"),
                                                fieldWithPath("body.createdAt").type(JsonFieldType.STRING)
                                                        .description("게시글 작성일"),
                                                fieldWithPath("body.isLiked").type(JsonFieldType.BOOLEAN)
                                                        .description("좋아요 여부"),
                                                fieldWithPath("body.isMyPost").type(JsonFieldType.BOOLEAN)
                                                        .description("내 게시글 여부"),
                                                fieldWithPath("body.commentList[].commentId").description(JsonFieldType.NUMBER)
                                                        .description("댓글 ID"),
                                                fieldWithPath("body.commentList[].imgUrl").description(JsonFieldType.STRING)
                                                        .description("댓글 작성자 이미지"),
                                                fieldWithPath("body.commentList[].nickname").description(JsonFieldType.STRING)
                                                        .description("댓글 작성자 닉네임"),
                                                fieldWithPath("body.commentList[].userId").description(JsonFieldType.STRING)
                                                        .description("댓글 작성자 ID(UUID)"),
                                                fieldWithPath("body.commentList[].contents").description(JsonFieldType.STRING)
                                                        .description("댓글 내용"),
                                                fieldWithPath("body.commentList[].createdAt").description(JsonFieldType.STRING)
                                                        .description("댓글 작성일"),
                                                fieldWithPath("body.commentList[].updatedAt").optional()
                                                        .description("댓글 수정일(없으면 null)")
                                        )
                                )
                                .responseSchema(Schema.schema("Post 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_상세_조회_실패_유효하지_않은_게시글_아이디() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.findPost(any(), any()))
                .thenThrow(new CustomException(POST_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                get("/posts/{postId}", 10000L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_NOT_FOUND.getMessage()))
                .andDo(print())
                .andDo(MockMvcRestDocumentation.document(
                        "Post 상세 조회 실패 - 유효하지 않은 게시글 ID",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 상세 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 상세 조회 Request"))
                                .responseSchema(Schema.schema("Post 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_수정_성공() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("게시글");
        tagList.add("수정");
        tagList.add("태그");
        tagList.add("다꾸");

        PostModifyReq postModifyReq = new PostModifyReq();
        postModifyReq.setContents("게시글 수정");
        postModifyReq.setTags(tagList);

        String jwtToken = jwtService.createAccessToken(UUID);

        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        String content = gson.toJson(postModifyReq);
        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", content.getBytes(StandardCharsets.UTF_8));

        List<TagDto> tagDtoList = new ArrayList<>();
        tagDtoList.add(TagDto.builder()
                    .tagId(5L)
                    .contents("게시글")
                .build());
        tagDtoList.add(TagDto.builder()
                    .tagId(6L)
                    .contents("수정")
                .build());
        tagDtoList.add(TagDto.builder()
                    .tagId(7L)
                    .contents("태그")
                .build());
        tagDtoList.add(TagDto.builder()
                    .tagId(8L)
                    .contents("다꾸")
                .build());
        when(postService.modifyPost(any(), any(), any(), any()))
                .thenReturn(new PostModifyRes(1L));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts/{postId}", 1L)
                        .file(file)
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        })
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_MODIFIED.getMessage()))
                .andDo(document(
                        "Post 수정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.postId").type(JsonFieldType.NUMBER)
                                                        .description("게시글 ID")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 수정 Request"))
                                .responseSchema(Schema.schema("Post 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_수정_실패_유효하지_않은_게시글_아이디() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("게시글");
        tagList.add("수정");
        tagList.add("태그");
        tagList.add("다꾸");

        PostModifyReq postModifyReq = new PostModifyReq();
        postModifyReq.setContents("게시글 수정");
        postModifyReq.setTags(tagList);

        String jwtToken = jwtService.createAccessToken(UUID);

        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        String content = gson.toJson(postModifyReq);
        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", content.getBytes(StandardCharsets.UTF_8));

        when(postService.modifyPost(any(), any(), any(), any()))
                .thenThrow(new CustomException(POST_NOT_FOUND));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts/{postId}", 10000L)
                        .file(dto)
                        .file(file)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        })
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_NOT_FOUND.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 수정 실패 - 유효하지 않은 게시글 ID",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 수정 Request"))
                                .responseSchema(Schema.schema("Post 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_수정_실패_태그_길이_초과() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");
        tagList.add("도영이짱짱짱짱 멋져");

        PostAddReq postAddReq = new PostAddReq();
        postAddReq.setContents("테스트111");
        postAddReq.setTags(tagList);

        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.modifyPost(any(), any(), any(), any()))
                .thenThrow(new CustomException(INVALID_TAG_CONTENTS));

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", new ObjectMapper().writeValueAsBytes(postAddReq));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts/{postId}", 1L)
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        })
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_TAG_CONTENTS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_TAG_CONTENTS.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 수정 실패 - 태그 길이 초과(10자 초과)인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 수정 Request"))
                                .responseSchema(Schema.schema("Post 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_수정_실패_태그_개수_초과() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");
        tagList.add("도영이짱5");
        tagList.add("도영이짱6");
        tagList.add("도영이짱7");
        tagList.add("도영이짱8");
        tagList.add("도영이짱9");
        tagList.add("도영이짱10");
        tagList.add("도영이짱11");

        PostModifyReq postModifyReq = new PostModifyReq();
        postModifyReq.setContents("테스트111");
        postModifyReq.setTags(tagList);

        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.modifyPost(any(), any(), any(), any()))
                .thenThrow(new CustomException(INVALID_TAG_SIZE));

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", new ObjectMapper().writeValueAsBytes(postModifyReq));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts/{postId}", 1L)
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        })
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_TAG_SIZE.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_TAG_SIZE.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 수정 실패 - 태그 개수 초과(10자 초과)인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 수정 Request"))
                                .responseSchema(Schema.schema("Post 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_수정_실패_나의_게시글이_아닌_경우() throws Exception {
        // given
        List<String> tagList = new ArrayList<>();
        tagList.add("김도영");
        tagList.add("잠실");
        tagList.add("기아");
        tagList.add("도영이");
        tagList.add("도영이짱5");
        tagList.add("도영이짱6");
        tagList.add("도영이짱7");
        tagList.add("도영이짱8");
        tagList.add("도영이짱9");

        PostModifyReq postModifyReq = new PostModifyReq();
        postModifyReq.setContents("테스트111");
        postModifyReq.setTags(tagList);

        String jwtToken = jwtService.createAccessToken(UUID);

        when(postService.modifyPost(any(), any(), any(), any()))
                .thenThrow(new CustomException(POST_UPDATE_FORBIDDEN));

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", new ObjectMapper().writeValueAsBytes(postModifyReq));

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/posts/{postId}", 1L)
                        .file(dto)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        })
        );

        //then
        actions
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_UPDATE_FORBIDDEN.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_UPDATE_FORBIDDEN.getMessage()))
                .andDo(print())
                .andDo(document(
                        "Post 수정 실패 - 나의 게시글이 아닌 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Post 수정 Request"))
                                .responseSchema(Schema.schema("Post 수정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_삭제_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                delete("/posts/{postId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_DELETED.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "Post 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .responseSchema(Schema.schema("Post 삭제 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_삭제_실패_유효하지_않은_게시글_아이디() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        doThrow(new CustomException(POST_NOT_FOUND))
                .when(postService).removePost(anyLong(), anyLong());

        //when
        ResultActions actions = mockMvc.perform(
                delete("/posts/{postId}", 10000L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_NOT_FOUND.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "Post 삭제 실패 - 유효하지 않은 게시글 ID",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .responseSchema(Schema.schema("Post 삭제 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 게시글_삭제_실패_나의_게시글이_아닌_경우() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        doThrow(new CustomException(POST_DELETE_FORBIDDEN))
                .when(postService).removePost(anyLong(), anyLong());

        //when
        ResultActions actions = mockMvc.perform(
                delete("/posts/{postId}", 2L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(POST_DELETE_FORBIDDEN.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(POST_DELETE_FORBIDDEN.getMessage()))
                .andDo(MockMvcRestDocumentation.document(
                        "Post 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Post API")
                                .summary("Post 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .responseSchema(Schema.schema("Post 삭제 Response"))
                                .build()
                        ))
                );
    }


}
