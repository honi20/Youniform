package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
public class WebSocketController {
    private final ChatService chatService;

    private final JwtService jwtService;

    // 채팅방에 메시지 전송 및 저장
    @MessageMapping("/{roomId}")
    @SendTo("/sub/{roomId}")
    public ChatMessage processChatMessage(@DestinationVariable Long roomId,
                                          @Payload ChatMessage chatMessage,
                                          SimpMessageHeaderAccessor headerAccessor) {
        String authHeader = headerAccessor.getFirstNativeHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = (Long) jwtService.getAuthentication(token).getPrincipal(); // 토큰에서 userId 추출
            String sessionId = headerAccessor.getSessionId();

            log.info("userId: {}, sessionId: {}, roomId: {}", userId, sessionId, roomId);

            return chatService.processChatMessage(roomId, chatMessage, userId, sessionId);
        } else {
            throw new IllegalArgumentException("유효하지 않은 헤더");
        }
    }
}