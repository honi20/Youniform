package com.youniform.api.global.handler;

import com.youniform.api.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
    private final RedisTemplate<String, Long> longRedisTemplate;
    private final ChatService chatService;

    private static final long HEARTBEAT_TIMEOUT = 1000L;

    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        Long userId = chatService.getUserIdFromSessionId(sessionId);

        if (userId != null) {
            Long roomId = chatService.getRoomIdFromSessionId(sessionId);

            if (roomId != null) {
                // Redis에서 세션 정보 삭제
                longRedisTemplate.delete("chat:user:" + userId + ":session:" + sessionId);
                longRedisTemplate.delete("session:" + sessionId);

                // 유저의 마지막 읽은 시간 업데이트
                chatService.updateLastReadTime(userId, roomId, LocalDateTime.now());

                // 방의 유저 수 갱신 및 브로드캐스트
                chatService.broadcastUserCount(roomId);

                log.info("Disconnected userId: {}, roomId: {}", userId, roomId);
            } else {
                log.warn("해당 sessionId에 해당하는 roomId를 찾을 수 없습니다. SessionId: {}", sessionId);
            }
        } else {
            log.error("UserId를 찾을 수 없습니다. 세션 해제에 실패했습니다. SessionId: {}", sessionId);
        }
    }

    @Scheduled(fixedRate = 10000)
    public void checkUserHeartbeats() {
        Set<String> keys = longRedisTemplate.keys("chat:user:*:session:*");
        long currentTime = System.currentTimeMillis();

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
                    log.info("UserId: {}, RoomId: {} - Last read time updated due to heartbeat timeout.", userId, roomId);
                }

                // Redis에서 만료된 세션 정보 삭제
                longRedisTemplate.delete(key);
                longRedisTemplate.delete("session:" + sessionId);

                chatService.broadcastUserCount(roomId);
                log.info("Expired session removed from Redis for UserId: {}, SessionId: {}", userId, sessionId);
            }
        }
    }
}