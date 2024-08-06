package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.redis.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
public class WebSocketController {
    private final ChatService chatService;
    private final RedisUtils redisUtils;

    // 채팅방에 메시지 전송 및 저장
    @MessageMapping("/{roomId}")
    @SendTo("/sub/{roomId}")
    public ChatMessage processChatMessage(@DestinationVariable Long roomId, @Payload ChatMessage chatMessage) {
        Long userId = (Long) redisUtils.getData(chatMessage.getUserId());
        return chatService.processChatMessage(roomId, userId, chatMessage);
    }
}