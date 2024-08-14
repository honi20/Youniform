package com.youniform.api.global.handler;

import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
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

        log.info("Connected sessionId: {}", sessionId);

        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        Long roomId = chatService.getRoomIdFromSessionId(sessionId);

        // Redis에 sessionId와 roomId 매핑 저장 (초기 연결 시)
        longRedisTemplate.opsForValue().set("session:" + sessionId, roomId, 5, TimeUnit.MINUTES);
        longRedisTemplate.opsForValue().set("chat:user:" + userId + ":session:" + sessionId, System.currentTimeMillis(), 5, TimeUnit.MINUTES);

        // 초기 접속 시 접속자 수 브로드캐스트
        chatService.broadcastUserCount(roomId);
        log.info("Connected userId: {}, roomId: {}", userId, roomId);
    }

    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        log.info("Disconnected sessionId: {}", sessionId);

        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        Long roomId = chatService.getRoomIdFromSessionId(sessionId);

        // Redis에서 세션 정보 삭제
        longRedisTemplate.delete("chat:user:" + userId + ":session:" + sessionId);
        longRedisTemplate.delete("session:" + sessionId);

        // 접속자 수 브로드캐스트
        chatService.broadcastUserCount(roomId);

        log.info("Disconnected userId: {}, roomId: {}", userId, roomId);
    }

    @Scheduled(fixedRate = 1000)
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