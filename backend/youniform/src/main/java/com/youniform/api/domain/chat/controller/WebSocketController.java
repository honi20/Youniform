package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.dto.ChatMessageReq;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_LIST_OK;

@Controller
@RequiredArgsConstructor
public class WebSocketController {
    private final ChatService chatService;

    private final JwtService jwtService;

    // 특정 채팅방에 메시지 전송
    @MessageMapping("/{roomId}")
    @SendTo("/sub/{roomId}")
    public ChatMessageDto addChatMessage(@DestinationVariable Long roomId, ChatMessageDto chatMessageDto) {
        chatService.addChatMessage(chatMessageDto.getUserId(), chatMessageDto.getRoomId(), chatMessageDto.getContent(), chatMessageDto.getNickname(), chatMessageDto.getImageUrl(), chatMessageDto.getMessageTime());
        return chatMessageDto;
    }

    // 메시지 조회
    @GetMapping("/chats/messages/{roomId}")
    public ResponseEntity<?> getChatMessages(@PathVariable("roomId") Long roomId, @ModelAttribute ChatMessageReq request, @RequestParam(defaultValue = "20") int size) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        SliceDto<ChatMessageDto> response = chatService.getChatMessages(roomId, userId, request, size);
        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, response), HttpStatus.OK);
    }
}