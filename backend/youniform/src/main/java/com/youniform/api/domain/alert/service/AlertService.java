package com.youniform.api.domain.alert.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

public interface AlertService {
	SseEmitter subscribe(Long userId, String lastEventId) throws IOException;

	void testAlert();
}
