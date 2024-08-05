package com.youniform.api.domain.chat.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.dto.res.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.res.ChatRoomListRes;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.service.JwtService;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.time.LocalDateTime;
import java.util.List;

import static com.youniform.api.global.statuscode.ErrorCode.CHATROOM_NOT_FOUND;
import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_DETAILS_OK;
import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_LIST_OK;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
@DisplayName("채팅 API 명세서")
@WithMockUser
public class ChatControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private ChatService chatService;

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
    public void 채팅방_상세조회_성공() throws Exception {
        ChatRoomDetailsRes chatRoomDetails = new ChatRoomDetailsRes(1L, "1번 방", true);
        List<ChatMessageDto> messageList = List.of(
                new ChatMessageDto(1L, 123L, "유저 1", "1번방 테스트1", "image.png", LocalDateTime.now())
        );
        SliceImpl<ChatMessageDto> slice = new SliceImpl<>(messageList, PageRequest.of(0, 10), false);
        SliceDto<ChatMessageDto> messages = new SliceDto<>(slice);

        when(chatService.getChatRoomDetails(anyLong())).thenReturn(chatRoomDetails);
        when(chatService.getChatMessages(anyLong(), anyInt())).thenReturn(messages);

        performGet("/chats/rooms/{roomId}", 1L)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_DETAILS_OK.getMessage()))
                .andExpect(jsonPath("$.body.chatRoomDetails.roomId").value(1L))
                .andExpect(jsonPath("$.body.chatRoomDetails.roomName").value("1번 방"))
                .andDo(document("채팅방_상세조회_성공",
                        preprocessRequest(),
                        preprocessResponse(),
                        responseFields(
                                fieldWithPath("header.httpStatusCode").description("HTTP 상태 코드"),
                                fieldWithPath("header.message").description("응답 메시지"),
                                fieldWithPath("body.chatRoomDetails.roomId").description("채팅방 ID"),
                                fieldWithPath("body.chatRoomDetails.roomName").description("채팅방 이름"),
                                fieldWithPath("body.chatRoomDetails.roomState").description("채팅방 상태"),
                                fieldWithPath("body.messages.content[].roomId").description("채팅방 ID"),
                                fieldWithPath("body.messages.content[].userId").description("사용자 ID"),
                                fieldWithPath("body.messages.content[].nickname").description("닉네임"),
                                fieldWithPath("body.messages.content[].content").description("내용"),
                                fieldWithPath("body.messages.content[].imageUrl").description("이미지 URL"),
                                fieldWithPath("body.messages.content[].messageTime").description("메시지 시간"),
                                fieldWithPath("body.messages.page").description("페이지 번호"),
                                fieldWithPath("body.messages.size").description("페이지 크기"),
                                fieldWithPath("body.messages.hasNext").description("다음 페이지 여부")
                        )));
    }

    @Test
    public void 채팅방_상세조회_실패_존재하지_않는_채팅방() throws Exception {
        when(chatService.getChatRoomDetails(anyLong())).thenThrow(new CustomException(CHATROOM_NOT_FOUND));

        performGet("/chats/rooms/{roomId}", 100L)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document("채팅방_상세조회_실패_존재하지_않는_채팅방",
                        preprocessRequest(),
                        preprocessResponse(),
                        responseFields(
                                fieldWithPath("header.httpStatusCode").description("HTTP 상태 코드"),
                                fieldWithPath("header.message").description("응답 메시지"),
                                fieldWithPath("body").description("응답 본문 (null 가능)").optional()
                        )));
    }


    @Test
    public void 채팅방_리스트_조회_성공() throws Exception {
        List<ChatRoomDetailsRes> chatRoomList = List.of(
                new ChatRoomDetailsRes(1L, "1번 방", true),
                new ChatRoomDetailsRes(2L, "2번 방", true)
        );
        ChatRoomListRes response = new ChatRoomListRes(chatRoomList);

        when(chatService.getChatRoomList(anyLong())).thenReturn(response);

        performGet("/chats/rooms")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_LIST_OK.getMessage()))
                .andExpect(jsonPath("$.body.chatRoomList[0].roomId").value(1L))
                .andExpect(jsonPath("$.body.chatRoomList[0].roomName").value("1번 방"))
                .andDo(document("채팅방_리스트_조회_성공",
                        preprocessRequest(),
                        preprocessResponse(),
                        responseFields(
                                fieldWithPath("header.httpStatusCode").description("HTTP 상태 코드"),
                                fieldWithPath("header.message").description("응답 메시지"),
                                fieldWithPath("body.chatRoomList[].roomId").description("채팅방 ID"),
                                fieldWithPath("body.chatRoomList[].roomName").description("채팅방 이름"),
                                fieldWithPath("body.chatRoomList[].roomState").description("채팅방 상태")
                        )));
    }

    @Test
    public void 채팅_메시지_이전_조회_성공() throws Exception {
        List<ChatMessageDto> messageList = List.of(
                new ChatMessageDto(1L, 123L, "유저 1", "1번 방 이전 테스트 1", "image.png", LocalDateTime.now())
        );
        SliceImpl<ChatMessageDto> slice = new SliceImpl<>(messageList, PageRequest.of(0, 10), false);
        SliceDto<ChatMessageDto> response = new SliceDto<>(slice);

        when(chatService.getPreviousMessages(anyLong(), anyLong(), anyInt())).thenReturn(response);

        performGet("/chats/messages/{roomId}/previous?messageId={messageId}&size={size}", 1L, 1L, 100)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_LIST_OK.getMessage()))
                .andDo(document("채팅_메시지_이전_조회_성공",
                        preprocessRequest(),
                        preprocessResponse(),
                        responseFields(
                                fieldWithPath("header.httpStatusCode").description("HTTP 상태 코드"),
                                fieldWithPath("header.message").description("응답 메시지"),
                                fieldWithPath("body.content[].roomId").description("채팅방 ID"),
                                fieldWithPath("body.content[].userId").description("사용자 ID"),
                                fieldWithPath("body.content[].nickname").description("닉네임"),
                                fieldWithPath("body.content[].content").description("내용"),
                                fieldWithPath("body.content[].imageUrl").description("이미지 URL"),
                                fieldWithPath("body.content[].messageTime").description("메시지 시간"),
                                fieldWithPath("body.page").description("페이지 번호"),
                                fieldWithPath("body.size").description("페이지 크기"),
                                fieldWithPath("body.hasNext").description("다음 페이지 여부")
                        )));
    }

    @Test
    public void 채팅_메시지_이후_조회_성공() throws Exception {
        List<ChatMessageDto> messageList = List.of(
                new ChatMessageDto(1L, 123L, "유저 1", "1번 방 이후 테스트 1", "image.png", LocalDateTime.now())
        );
        SliceImpl<ChatMessageDto> slice = new SliceImpl<>(messageList, PageRequest.of(0, 10), false);
        SliceDto<ChatMessageDto> response = new SliceDto<>(slice);

        when(chatService.getNextMessages(anyLong(), anyLong(), anyInt())).thenReturn(response);

        performGet("/chats/messages/{roomId}/next?messageId={messageId}&size={size}", 1L, 1L, 100)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_LIST_OK.getMessage()))
                .andDo(document("채팅_메시지_이후_조회_성공",
                        preprocessRequest(),
                        preprocessResponse(),
                        responseFields(
                                fieldWithPath("header.httpStatusCode").description("HTTP 상태 코드"),
                                fieldWithPath("header.message").description("응답 메시지"),
                                fieldWithPath("body.content[].roomId").description("채팅방 ID"),
                                fieldWithPath("body.content[].userId").description("사용자 ID"),
                                fieldWithPath("body.content[].nickname").description("닉네임"),
                                fieldWithPath("body.content[].content").description("내용"),
                                fieldWithPath("body.content[].imageUrl").description("이미지 URL"),
                                fieldWithPath("body.content[].messageTime").description("메시지 시간"),
                                fieldWithPath("body.page").description("페이지 번호"),
                                fieldWithPath("body.size").description("페이지 크기"),
                                fieldWithPath("body.hasNext").description("다음 페이지 여부")
                        )));
    }

    private ResultActions performGet(String path, Object... pathVariable) throws Exception {
        MockHttpServletRequestBuilder requestBuilder;

        if (pathVariable != null && pathVariable.length > 0) {
            requestBuilder = get(path, pathVariable);
        } else {
            requestBuilder = get(path);
        }

        return mockMvc.perform(
                requestBuilder
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );
    }
}