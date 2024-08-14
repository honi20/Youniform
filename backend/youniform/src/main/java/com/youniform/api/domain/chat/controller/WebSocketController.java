package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
public class WebSocketController {
    private final ChatService chatService;

    private final JwtService jwtService;

    private final RedisTemplate<String, Long> longRedisTemplate;

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
            log.info("웹소켓1 : processChatMessage() userId: {}", userId);
            return chatService.processChatMessage(roomId, chatMessage, userId);
        } else {
            log.warn("Authorization 헤더가 없음 또는 잘못된 형식");
            throw new IllegalArgumentException("Authorization 헤더가 유효하지 않습니다.");
        }
    }

    // 하트비트 측정
    @MessageMapping("/heartbeat")
    public void processHeartbeat(SimpMessageHeaderAccessor headerAccessor) {
        log.info("heartbeat 연결 성공!!");
        String sessionId = headerAccessor.getSessionId();

        String authHeader = headerAccessor.getFirstNativeHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = (Long) jwtService.getAuthentication(token).getPrincipal();

            long currentTimeMillis = System.currentTimeMillis();
            String redisKey = "chat:user:" + userId + ":session:" + sessionId;

            longRedisTemplate.opsForValue().set(redisKey, currentTimeMillis, 1, TimeUnit.MINUTES);
            log.info("longRedisTemplate 설정끝!");
        }
    }
}