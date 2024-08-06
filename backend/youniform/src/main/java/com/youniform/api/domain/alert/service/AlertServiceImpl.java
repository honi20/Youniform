package com.youniform.api.domain.alert.service;

import com.youniform.api.domain.alert.dto.AlertDto;
import com.youniform.api.domain.alert.dto.AlertListRes;
import com.youniform.api.domain.alert.dto.AlertReq;
import com.youniform.api.domain.alert.entity.Alert;
import com.youniform.api.domain.alert.entity.AlertType;
import com.youniform.api.domain.alert.repository.AlertRepository;
import com.youniform.api.domain.alert.repository.SseRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static com.youniform.api.global.statuscode.ErrorCode.ALERT_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService {
	private static final Logger log = LoggerFactory.getLogger(AlertServiceImpl.class);
	private final SseRepository sseRepository;
	private final AlertRepository alertRepository;

	// 연결 지속 시간 : 1시간
	private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
	
	@Override
	public SseEmitter subscribe(Long userId, String lastEventId) throws IOException {
		String emitterId = userId + "_" + System.currentTimeMillis();

		SseEmitter emitter = sseRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
		log.info("new emitter added : {}", emitter);
		log.info("lastEventId : {}", lastEventId);

		emitter.onCompletion(() -> sseRepository.deleteById(emitterId));
		emitter.onTimeout(() -> sseRepository.deleteById(emitterId));
		emitter.onError((e) -> sseRepository.deleteById(emitterId));

		// 503 Service Unavailable 방지용 dummy event 전송
		sendToClient(emitter, emitterId, "Connection Completed. [userId = " + userId + "]");

		// 클라이언트가 미수신한 event 목록이 존재하는 경우
		if (!lastEventId.isEmpty()) {
			Map<String, Object> events = sseRepository.findAllEventCacheStartWithUserId(String.valueOf(userId));
			events.entrySet().stream()
					.filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
					.forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
		}

		return emitter;
	}

	@Override
	public AlertListRes findAlerts(Long userId) {
		List<Alert> alerts = alertRepository.findByReceiverIdAndIsDeletedFalse(userId);

		List<AlertDto> alertList = alerts.stream()
				.map(AlertDto::toDto)
				.toList();

		return new AlertListRes(alertList);
	}

	@Override
	public void modifyAlertRead(Long userId, Long alertId) {
		Alert alert = alertRepository.findByIdAndReceiverId(alertId, userId)
				.orElseThrow(() -> new CustomException(ALERT_NOT_FOUND));

		alert.updateIsRead();
		alertRepository.save(alert);
	}

	@Override
	public void modifyAlertAllRead(Long userId) {
		List<Alert> alerts = alertRepository.findByReceiverId(userId);

		alerts.forEach(alert -> {
			alert.updateIsRead();
			alertRepository.save(alert);
		});
	}

	@Override
	public void testAlert() {
		Users receiver = Users.builder()
				.id(123L)
				.uuid("1604b772-adc0-4212-8a90-81186c57f598")
				.nickname("User1")
				.build();

		Users sender = Users.builder()
				.id(124L)
				.uuid("1604b772-adc0-4212-8a90-81186c57f100")
				.nickname("User2")
				.profileUrl("user2 profile url")
				.build();

		AlertReq alertReq = AlertReq.builder()
				.receiver(receiver)
				.sender(sender)
				.type(String.valueOf(AlertType.POST_COMMENT))
				.content("최강 몬스터즈 우승")
				.link("http://youniform.com")
				.build();

		send(alertReq);
	}

	public void send(AlertReq alertReq) {
		Alert alert = alertRepository.save(alertReq.toEntity());
		AlertDto alertDto = AlertDto.toDto(alert);
		String userId = String.valueOf(alertReq.getReceiver().getId());

		Map<String, SseEmitter> sseEmitters = sseRepository.findAllEmitterStartWithUserId(userId);
		sseEmitters.forEach(
				(key, emitter) -> {
					sseRepository.saveEventCache(key, alert);
					sendToClient(emitter, key, alertDto);
				}
		);
	}

	private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
		try {
			emitter.send(SseEmitter.event()
					.id(emitterId)
					.name("sse-connect")
					.data(data, MediaType.APPLICATION_JSON));
		} catch (IOException e) {
			sseRepository.deleteById(emitterId);
			throw new RuntimeException("Connection Failed");
		}
	}
}
