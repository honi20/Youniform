package com.youniform.api.domain.alert.service;

import com.youniform.api.domain.alert.dto.AlertListRes;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

public interface AlertService {
	SseEmitter subscribe(Long userId, String lastEventId) throws IOException;

	AlertListRes findAlerts(Long userId);

	void modifyAlertRead(Long userId, Long alertId);

	void modifyAlertAllRead(Long userId);

	void testAlert();
}
