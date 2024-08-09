package com.youniform.api.domain.alert.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface SseRepository {
	SseEmitter save(String emitterId, SseEmitter sseEmitter);

	void saveEventCache(String emitterId, Object event);

	Map<String, SseEmitter> findAllEmitterStartWithUserId(String userId);

	Map<String, Object> findAllEventCacheStartWithUserId(String userId);

	void deleteById(String emitterId);

	void deleteAllEmitterStartWithUserId(String userId);

	void deleteAllEventCacheStartWithUserId(String userId);
}
