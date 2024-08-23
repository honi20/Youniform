package com.youniform.api.domain.friend.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;
import com.youniform.api.domain.friend.dto.*;
import com.youniform.api.domain.friend.entity.Status;
import com.youniform.api.domain.friend.service.FriendService;
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

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.ErrorCode.FRIEND_NOT_FOUND;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
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
@DisplayName("친구 API 명세서")
@WithMockUser
public class FriendControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private FriendService friendService;

    @Test
    public void 친구_요청_성공() throws Exception {
        //given
        FriendRequestReq friendRequestReq = new FriendRequestReq();
        friendRequestReq.setFriendUuid("1604b772-adc0-4212-8a90-81186c57f100");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(friendRequestReq);

        //when
        when(jwtService.getUserId(any())).thenReturn(123L);

        ResultActions actions = mockMvc.perform(
                post("/api/friends/request")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_REQUEST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_REQUEST_OK.getMessage()))
                .andDo(document(
                        "Friend 요청 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Friend API")
                                .summary("Friend 요청 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("friendUuid").type(JsonFieldType.STRING)
                                                .description("요청 할 친구 ID(UUID)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Friend 요청 Request"))
                                .responseSchema(Schema.schema("Friend 요청 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 친구_요청_실패_유효하지_않은_친구_아이디() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        FriendRequestReq friendRequestReq = new FriendRequestReq();
        friendRequestReq.setFriendUuid("1604b772-adc0-4212-8a90-8");

        //when
        when(friendService.requestFriend(any(), any()))
                .thenThrow(new CustomException(FRIEND_NOT_FOUND));

        String content = gson.toJson(friendRequestReq);

        ResultActions actions = mockMvc.perform(
                post("/api/friends/request")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())

        );

        // then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_NOT_FOUND.getMessage()))
                .andDo(document(
                        "Friend 요청 실패 - 친구 없음",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Friend API")
                                .summary("Friend 요청 실패 - 친구 없음 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("friendUuid").type(JsonFieldType.STRING)
                                                .description("요청 할 친구 ID(UUID)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Friend 요청 실패 - 친구 없음 Request"))
                                .responseSchema(Schema.schema("Friend 요청 실패 - 친구 없음 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 친구_요청_수락_성공() throws Exception {
        //given
        FriendAcceptReq friendAcceptReq = new FriendAcceptReq();
        friendAcceptReq.setFriendUuid("dstfiposdjfsd0f-sb3t466t54regfdb-dsbsdb4324543");

        String jwtToken = jwtService.createAccessToken(UUID);

        String content = gson.toJson(friendAcceptReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/api/friends/accept")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_ACCEPT_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_ACCEPT_OK.getMessage()))
                .andDo(document(
                        "Friend 요청 수락 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Friend API")
                                .summary("Friend 요청 수락 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("friendUuid").type(JsonFieldType.STRING)
                                                .description("요청 수락 할 친구 ID(UUID)")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("Friend 요청 수락 Request"))
                                .responseSchema(Schema.schema("Friend 요청 수락 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 친구_요청_거절_성공() throws Exception {
        // given
        String friendUuid = "dstfiposdjfsd0f-sb3t466t54regfdb-dsbsdb4324543";
        String jwtToken = jwtService.createAccessToken(UUID);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/api/friends/reject")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("friendUuid", friendUuid)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf().asHeader())
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_REJECTED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_REJECTED.getMessage()))
                .andDo(document(
                        "Friend 요청 거절 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Friend API")
                                .summary("Friend 요청 거절 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("friendUuid").description("요청 거절할 친구 ID(UUID)").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .responseSchema(Schema.schema("Friend 요청 거절 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 마이페이지_친구_목록_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        List<FriendMypageDto> friends = new ArrayList<>();
        friends.add(FriendMypageDto.builder()
                .userId("1604b772-adc0-4212-8a90-81186c57f100")
                .imgUrl("http://example.com/img.jpg")
                .nickname("유저 1")
                .introduce("안녕하세요")
                .teamUrl("http://example.com/team.jpg")
                .isFriend(Status.FRIEND)
                .build());

        FriendMypageRes friendMypageRes = FriendMypageRes.builder()
                .friendMypageList(friends)
                .build();

        when(friendService.findMypageFriends(any())).thenReturn(friendMypageRes);

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/friends/mypage")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_LIST_OK.getMessage()))
                .andExpect(jsonPath("$.body.friendMypageList[0].userId").value("1604b772-adc0-4212-8a90-81186c57f100"))
                .andExpect(jsonPath("$.body.friendMypageList[0].imgUrl").value("http://example.com/img.jpg"))
                .andExpect(jsonPath("$.body.friendMypageList[0].nickname").value("유저 1"))
                .andExpect(jsonPath("$.body.friendMypageList[0].introduce").value("안녕하세요"))
                .andExpect(jsonPath("$.body.friendMypageList[0].teamUrl").value("http://example.com/team.jpg"))
                .andDo(document(
                        "Mypage Friend 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Friend API")
                                .summary("Mypage Friend 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.friendMypageList[].userId").type(JsonFieldType.STRING)
                                                        .description("친구 아이디(UUID)"),
                                                fieldWithPath("body.friendMypageList[].imgUrl").type(JsonFieldType.STRING)
                                                        .description("친구 프로필 사진 URL"),
                                                fieldWithPath("body.friendMypageList[].nickname").type(JsonFieldType.STRING)
                                                        .description("친구 닉네임"),
                                                fieldWithPath("body.friendMypageList[].introduce").type(JsonFieldType.STRING)
                                                        .description("친구 한줄소개"),
                                                fieldWithPath("body.friendMypageList[].teamUrl").type(JsonFieldType.STRING)
                                                        .description("응원 팀 이미지 URL"),
                                                fieldWithPath("body.friendMypageList[].isFriend").type(JsonFieldType.STRING)
                                                        .description("친구 상태 (FRIEND, WAITING, NOT_FRIEND)")
                                        )
                                )
                                .responseSchema(Schema.schema("Mypage Friend 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 다이어리_친구_목록_조회_성공() throws Exception {
        //given
        String jwtToken = jwtService.createAccessToken(UUID);

        List<FriendDiaryDto> friends = new ArrayList<>();
        friends.add(FriendDiaryDto.builder()
                .friendId("1604b772-adc0-4212-8a90-81186c57f100")
                .imgUrl("http://example.com/img.jpg")
                .nickname("유저 1")
                .isDiaryUpdated(true)
                .build());

        FriendDiaryRes friendDiaryeRes = FriendDiaryRes.builder()
                .friendDiaryList(friends)
                .build();

        when(friendService.findDiaryFriends(any())).thenReturn(friendDiaryeRes);

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/friends/diary")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_LIST_OK.getMessage()))
                .andExpect(jsonPath("$.body.friendDiaryList[0].friendId").value("1604b772-adc0-4212-8a90-81186c57f100"))
                .andExpect(jsonPath("$.body.friendDiaryList[0].imgUrl").value("http://example.com/img.jpg"))
                .andExpect(jsonPath("$.body.friendDiaryList[0].nickname").value("유저 1"))
                .andExpect(jsonPath("$.body.friendDiaryList[0].diaryUpdated").value("true"))
                .andDo(document(
                        "Diary Friend 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Friend API")
                                .summary("Diary Friend 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.friendDiaryList[].friendId").type(JsonFieldType.STRING)
                                                        .description("친구 아이디(UUID)"),
                                                fieldWithPath("body.friendDiaryList[].imgUrl").type(JsonFieldType.STRING)
                                                        .description("친구 프로필 사진 URL"),
                                                fieldWithPath("body.friendDiaryList[].nickname").type(JsonFieldType.STRING)
                                                        .description("친구 닉네임"),
                                                fieldWithPath("body.friendDiaryList[].diaryUpdated").type(JsonFieldType.BOOLEAN)
                                                        .description("다이어리 업데이트 여부")
                                        )
                                )
                                .responseSchema(Schema.schema("Diary Friend 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 친구_삭제_성공() throws Exception {
        //given
        String friendUuid = "dstfiposdjfsd0f-sb3t466t54regfdb-dsbsdb4324543";

        String jwtToken = jwtService.createAccessToken(UUID);

        //when
        ResultActions actions = mockMvc.perform(
                delete("/api/friends")
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("friendUuid", friendUuid)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf().asHeader())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(FRIEND_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(FRIEND_DELETED.getMessage()))
                .andDo(document(
                        "Friend 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Friend API")
                                .summary("Friend 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("friendUuid").description("친구 Id(UUID)").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .responseSchema(Schema.schema("Friend 삭제 Response"))
                                .build()
                        ))
                );

    }
}
