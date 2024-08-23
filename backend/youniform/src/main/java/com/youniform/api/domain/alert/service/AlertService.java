package com.youniform.api.domain.alert.service;

import com.youniform.api.domain.alert.dto.AlertListRes;
import com.youniform.api.domain.alert.entity.AlertType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

public interface AlertService {
    SseEmitter subscribe(Long userId, String lastEventId) throws IOException;

    AlertListRes findAlerts(Long userId);

    void modifyAlertRead(Long userId, Long alertId);

    void modifyAlertAllRead(Long userId);

    void removeAlert(Long userId, Long alertId);

    void removeAllAlert(Long userId);

    void sendPlayerAppearance(Long playerId);

    void send(String receiverUuid, Long senderId, AlertType type, String content, Long pk);

    void testAlert();

    void sendCleanSweepAlert();
}
