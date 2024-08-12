package com.youniform.api.domain.chat.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.chat.dto.*;
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
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.youniform.api.global.statuscode.ErrorCode.CHATROOM_NOT_FOUND;
import static com.youniform.api.global.statuscode.SuccessCode.*;
import static com.youniform.api.utils.ResponseFieldUtils.getCommonResponseFields;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
                new ChatMessageDto(1L, "유저 1", "1번방 테스트1", "image.png", LocalDateTime.now())
        );
        SliceImpl<ChatMessageDto> slice = new SliceImpl<>(messageList, PageRequest.of(0, 10), false);
        SliceDto<ChatMessageDto> messages = new SliceDto<>(slice);

        when(chatService.getChatRoomDetails(anyLong())).thenReturn(chatRoomDetails);
        when(chatService.getChatMessages(anyLong(), anyInt())).thenReturn(messages);

        ResultActions actions = mockMvc.perform(
                get("/chats/rooms/{roomId}", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_DETAILS_OK.getMessage()))
                .andExpect(jsonPath("$.body.chatRoomDetails.roomId").value(1L))
                .andExpect(jsonPath("$.body.chatRoomDetails.roomName").value("1번 방"))
                .andDo(document("채팅방 상세조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("Chat API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomDetails.roomId").type(JsonFieldType.NUMBER)
                                                        .description("채팅방 ID"),
                                                fieldWithPath("body.chatRoomDetails.roomName").type(JsonFieldType.STRING)
                                                        .description("채팅방 이름"),
                                                fieldWithPath("body.chatRoomDetails.roomState").type(JsonFieldType.BOOLEAN)
                                                        .description("채팅방 상태"),
                                                fieldWithPath("body.messages.content[].roomId").type(JsonFieldType.NUMBER)
                                                        .description("채팅방 ID"),
                                                fieldWithPath("body.messages.content[].nickname").type(JsonFieldType.STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.messages.content[].content").type(JsonFieldType.STRING)
                                                        .description("내용"),
                                                fieldWithPath("body.messages.content[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("이미지 URL"),
                                                fieldWithPath("body.messages.content[].messageTime").type(JsonFieldType.STRING)
                                                        .description("메시지 시간"),
                                                fieldWithPath("body.messages.page").type(JsonFieldType.NUMBER)
                                                        .description("페이지 번호"),
                                                fieldWithPath("body.messages.size").type(JsonFieldType.NUMBER)
                                                        .description("페이지 크기"),
                                                fieldWithPath("body.messages.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 페이지 여부")
                                        )
                                )
                                .responseSchema(Schema.schema("채팅방 상세조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 채팅방_상세조회_실패_존재하지_않는_채팅방() throws Exception {
        when(chatService.getChatRoomDetails(anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_FOUND));

        ResultActions actions = mockMvc.perform(
                get("/chats/rooms/{roomId}", 100L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document("채팅방 상세조회 실패 - 존재하지 않는 채팅방(RoomID가 유효하지 않음)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("Chat API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(JsonFieldType.NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .responseSchema(Schema.schema("채팅방 상세조회 Response"))
                                .build()
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

        ResultActions actions = mockMvc.perform(
                get("/chats/rooms")
                        .header("Authorization", "Bearer " + jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_LIST_OK.getMessage()))
                .andExpect(jsonPath("$.body.chatRoomList[0].roomId").value(1L))
                .andExpect(jsonPath("$.body.chatRoomList[0].roomName").value("1번 방"))
                .andDo(document("채팅방 리스트 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("Chat API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomList[].roomId").type(JsonFieldType.NUMBER)
                                                        .description("채팅방 ID"),
                                                fieldWithPath("body.chatRoomList[].roomName").type(JsonFieldType.STRING)
                                                        .description("채팅방 이름"),
                                                fieldWithPath("body.chatRoomList[].roomState").type(JsonFieldType.BOOLEAN)
                                                        .description("채팅방 상태")
                                        )
                                )
                                .responseSchema(Schema.schema("채팅방 리스트 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 채팅_메시지_이전_조회_성공() throws Exception {
        List<ChatMessageDto> messageList = List.of(
                new ChatMessageDto(1L, "유저 1", "1번 방 이전 테스트 1", "image.png", LocalDateTime.now())
        );
        SliceImpl<ChatMessageDto> slice = new SliceImpl<>(messageList, PageRequest.of(0, 10), false);
        SliceDto<ChatMessageDto> response = new SliceDto<>(slice);

        when(chatService.getPreviousMessages(anyLong(), anyLong(), anyInt())).thenReturn(response);

        ResultActions actions = mockMvc.perform(
                get("/chats/messages/{roomId}/previous", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("messageId", "1")
                        .param("size", "100")
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_LIST_OK.getMessage()))
                .andDo(document("이전 메시지 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("Chat API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("messageId").description("조회할 messageId"),
                                        parameterWithName("size").description("조회할 메시지 size")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.content[].roomId").type(JsonFieldType.NUMBER)
                                                        .description("채팅방 ID"),
                                                fieldWithPath("body.content[].nickname").type(JsonFieldType.STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.content[].content").type(JsonFieldType.STRING)
                                                        .description("내용"),
                                                fieldWithPath("body.content[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("이미지 URL"),
                                                fieldWithPath("body.content[].messageTime").type(JsonFieldType.STRING)
                                                        .description("메시지 시간"),
                                                fieldWithPath("body.page").type(JsonFieldType.NUMBER)
                                                        .description("페이지 번호"),
                                                fieldWithPath("body.size").type(JsonFieldType.NUMBER)
                                                        .description("페이지 크기"),
                                                fieldWithPath("body.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 페이지 여부")
                                        )
                                )
                                .responseSchema(Schema.schema("이전 메시지 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 채팅_메시지_이후_조회_성공() throws Exception {
        List<ChatMessageDto> messageList = List.of(
                new ChatMessageDto(1L, "유저 1", "1번 방 이후 테스트 1", "image.png", LocalDateTime.now())
        );
        SliceImpl<ChatMessageDto> slice = new SliceImpl<>(messageList, PageRequest.of(0, 10), false);
        SliceDto<ChatMessageDto> response = new SliceDto<>(slice);

        when(chatService.getNextMessages(anyLong(), anyLong(), anyInt())).thenReturn(response);

        ResultActions actions = mockMvc.perform(
                get("/chats/messages/{roomId}/next", 1L)
                        .header("Authorization", "Bearer " + jwtToken)
                        .param("messageId", "1")
                        .param("size", "100")
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_LIST_OK.getMessage()))
                .andDo(document("이후 메시지 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("Chat API")
                                .requestHeaders(
                                        headerWithName("Authorization").description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("messageId").description("조회할 messageId"),
                                        parameterWithName("size").description("조회할 메시지 size")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.content[].roomId").type(JsonFieldType.NUMBER)
                                                        .description("채팅방 ID"),
                                                fieldWithPath("body.content[].nickname").type(JsonFieldType.STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.content[].content").type(JsonFieldType.STRING)
                                                        .description("내용"),
                                                fieldWithPath("body.content[].imageUrl").type(JsonFieldType.STRING)
                                                        .description("이미지 URL"),
                                                fieldWithPath("body.content[].messageTime").type(JsonFieldType.STRING)
                                                        .description("메시지 시간"),
                                                fieldWithPath("body.page").type(JsonFieldType.NUMBER)
                                                        .description("페이지 번호"),
                                                fieldWithPath("body.size").type(JsonFieldType.NUMBER)
                                                        .description("페이지 크기"),
                                                fieldWithPath("body.hasNext").type(JsonFieldType.BOOLEAN)
                                                        .description("다음 페이지 여부")
                                        )
                                )
                                .responseSchema(Schema.schema("이후 메시지 조회 Response"))
                                .build()
                        )));
    }

    @Test
    public void 이미지_업로드_성공() throws Exception {
        // given
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test image content".getBytes());

        ChatUploadImageRes uploadImageRes = new ChatUploadImageRes("test-upload-url");
        when(chatService.uploadImage(any(MockMultipartFile.class))).thenReturn(uploadImageRes);

        // when
        ResultActions actions = mockMvc
                .perform(RestDocumentationRequestBuilders
                        .multipart("/chats/messages/upload")
                .file(file)
                .with(csrf())
                .contentType("multipart/form-data")
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode")
                        .value(IMAGE_UPLOAD_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message")
                        .value(IMAGE_UPLOAD_OK.getMessage()))
                .andExpect(jsonPath("$.body.imageUrl")
                        .value("test-upload-url"))
                .andDo(print())
                .andDo(document(
                        "이미지 업로드 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("Image Upload API")
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.imageUrl")
                                                        .type(JsonFieldType.STRING)
                                                        .description("업로드된 이미지 URL")
                                        )
                                )
                                .responseSchema(Schema.schema("Image Upload Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 이미지_다운로드_테스트() throws Exception {
        InputStream inputStream = new ByteArrayInputStream("test image content".getBytes());
        InputStreamResource resource = new InputStreamResource(inputStream);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "test.jpg");
        headers.setContentType(MediaType.IMAGE_JPEG);

        when(chatService.downloadImage(anyString())).thenReturn(resource);

        mockMvc.perform(get("/chats/messages/download")
                        .param("imgUrl", "test.jpg")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.CONTENT_DISPOSITION, "form-data; name=\"attachment\"; filename=\"test.jpg\""))
                .andExpect(header().string(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE))
                .andDo(document("이미지 다운로드 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("Image Download API")
                                .queryParameters(
                                        parameterWithName("imgUrl").description("이미지 URL")
                                )
                                .responseHeaders(
                                        headerWithName(HttpHeaders.CONTENT_DISPOSITION).description("파일 첨부 헤더"),
                                        headerWithName(HttpHeaders.CONTENT_TYPE).description("컨텐츠 타입")
                                )
                                .build()
                        )));
    }
}