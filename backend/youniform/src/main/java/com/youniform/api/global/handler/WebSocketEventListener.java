package com.youniform.api.global.handler;

import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
    private final JwtService jwtService;

    private final RedisTemplate<String, Long> longRedisTemplate;

    private final ChatService chatService;

    private static final long HEARTBEAT_TIMEOUT = 1000L;

    @EventListener
    public void handleSessionConnected(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        log.info("Connected sessionId: {}", sessionId);

        String authHeader = headerAccessor.getFirstNativeHeader("Authorization");
        if (authHeader == null) {
            log.error("Authorization 헤더가 없음");
            throw new IllegalArgumentException("Authorization 헤더가 없음");
        } else if (!authHeader.startsWith("Bearer ")) {
            log.error("잘못된 Authorization 헤더 형식: {}", authHeader);
            throw new IllegalArgumentException("Authorization 헤더가 유효하지 않습니다.");
        } else {
            String token = authHeader.substring(7);
            log.info("JWT Token: {}", token);

            try {
                Long userId = (Long) jwtService.getAuthentication(token).getPrincipal();
                log.info("웹소켓1 : processChatMessage() userId: {}", userId);
                Long roomId = chatService.getRoomIdFromSessionId(sessionId);

                longRedisTemplate.opsForValue().set("session:" + sessionId, roomId, 5, TimeUnit.MINUTES);
                longRedisTemplate.opsForValue().set("chat:user:" + userId + ":session:" + sessionId, System.currentTimeMillis(), 5, TimeUnit.MINUTES);

                chatService.broadcastUserCount(roomId);
                log.info("Connected userId: {}, roomId: {}", userId, roomId);
            } catch (Exception e) {
                log.error("JWT 토큰 처리 중 오류 발생", e);

                throw new IllegalArgumentException("JWT 토큰이 유효하지 않습니다.", e);
            }
        }
    }

    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        log.info("Disconnected sessionId: {}", sessionId);

        Long roomId = chatService.getRoomIdFromSessionId(sessionId);

        String authHeader = headerAccessor.getFirstNativeHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = (Long) jwtService.getAuthentication(token).getPrincipal();
            longRedisTemplate.delete("chat:user:" + userId + ":session:" + sessionId);
            longRedisTemplate.delete("session:" + sessionId);
            chatService.broadcastUserCount(roomId);
            log.info("Disconnected userId: {}, roomId: {}", userId, roomId);
        }
    }

    @Scheduled(fixedRate = 10000)
    public void checkUserHeartbeats() {
        Set<String> keys = longRedisTemplate.keys("chat:user:*:session:*");
        long currentTime = System.currentTimeMillis();

        log.info("Check user heartbeats");

        for (String key : keys) {
            Long lastHeartbeatTime = longRedisTemplate.opsForValue().get(key);
            if (lastHeartbeatTime != null && (currentTime - lastHeartbeatTime) > HEARTBEAT_TIMEOUT) {
                String[] parts = key.split(":");
                Long userId = Long.valueOf(parts[2]);
                String sessionId = parts[4];
                Long roomId = chatService.getRoomIdFromSessionId(sessionId);

                if (roomId != null) {
                    // 유저의 마지막 읽은 시간 업데이트 및 유효하지 않은 세션 제거
                    chatService.updateLastReadTime(userId, roomId, LocalDateTime.now());

                    // 접속자 수 업데이트
                    chatService.broadcastUserCount(roomId);
                }

                // Redis에서 만료된 세션 정보 삭제
                longRedisTemplate.delete(key);
                longRedisTemplate.delete("session:" + sessionId);
            }
        }

        log.info("Check user heartbeats completed");
    }
}
