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

import java.security.Principal;
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

    // 하트비트 처리
    @MessageMapping("/heartbeat/{roomId}")
    public void processHeartbeat(@DestinationVariable Long roomId, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        log.info("session id 접수 완료"+ sessionId);

        String authHeader = headerAccessor.getFirstNativeHeader("Authorization");
        Long userId = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            userId = (Long) jwtService.getAuthentication(token).getPrincipal();
            log.info("하트비트 처리: userId: {}, sessionId: {}, roomId: {}", userId, sessionId, roomId);
        } else {
            log.info("헤더 없음!");
            throw new IllegalArgumentException("Authorization 헤더가 유효하지 않습니다.");
        }

        if (userId != null) {
            log.info("userId 있음!!");
            long currentTimeMillis = System.currentTimeMillis();

            String userSessionKey = "chat:user:" + userId + ":session:" + sessionId;
            String sessionRoomKey = "session:" + sessionId;

            // Redis에 현재 시간과 roomId 저장 또는 갱신
            longRedisTemplate.opsForValue().set(userSessionKey, currentTimeMillis, 1, TimeUnit.MINUTES);
            longRedisTemplate.opsForValue().set(sessionRoomKey, roomId, 1, TimeUnit.MINUTES);

            log.info("Heartbeat received and stored for userId: {}, sessionId: {}, roomId: {}", userId, sessionId, roomId);

            // 방의 유저 수 갱신 및 브로드캐스트
            chatService.broadcastUserCount(roomId);
        } else {
            log.warn("Heartbeat 처리 중 UserId를 찾을 수 없습니다. SessionId: {}", sessionId);
        }
    }
}