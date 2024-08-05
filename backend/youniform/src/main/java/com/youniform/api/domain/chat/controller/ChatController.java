package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.dto.res.ChatMessageRes;
import com.youniform.api.domain.chat.dto.res.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.res.ChatRoomListRes;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_DETAILS_OK;
import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_LIST_OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chats")
@Validated
public class ChatController {
    private final ChatService chatService;

    private final JwtService jwtService;

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<?> chatRoomDetails(@PathVariable("roomId") Long roomId,
                                             @RequestParam(defaultValue = "100") int size) {
        ChatRoomDetailsRes chatRoomDetails = chatService.getChatRoomDetails(roomId);
        SliceDto<ChatMessageDto> messages = chatService.getChatMessages(roomId, size);

        ChatMessageRes chatMessageRes = ChatMessageRes.toDto(chatRoomDetails, messages);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_DETAILS_OK, chatMessageRes), HttpStatus.OK);
    }

    @GetMapping("/rooms")
    public ResponseEntity<?> getChatRoomList() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        ChatRoomListRes chatRoomList = chatService.getChatRoomList(userId);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, chatRoomList), HttpStatus.OK);
    }

    @GetMapping("/chats/messages/{roomId}/previous")
    public ResponseEntity<?> getPreviousMessages(@PathVariable("roomId") Long roomId,
                                                 @RequestParam Long messageId,
                                                 @RequestParam(defaultValue = "100") int size) {
        SliceDto<ChatMessageDto> response = chatService.getPreviousMessages(roomId, messageId, size);
        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, response), HttpStatus.OK);
    }

    @GetMapping("/chats/messages/{roomId}/next")
    public ResponseEntity<?> getNextMessages(@PathVariable("roomId") Long roomId,
                                             @RequestParam Long messageId,
                                             @RequestParam(defaultValue = "100") int size) {
        SliceDto<ChatMessageDto> response = chatService.getNextMessages(roomId, messageId, size);
        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, response), HttpStatus.OK);
    }
}