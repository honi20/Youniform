package com.youniform.api.domain.alert.controller;

import com.youniform.api.domain.alert.dto.AlertListRes;
import com.youniform.api.domain.alert.service.AlertService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

import static com.youniform.api.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
@Validated
public class AlertController {
	private final AlertService alertService;

	private final JwtService jwtService;

	@GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<SseEmitter> subscribe(@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) throws IOException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		SseEmitter response = alertService.subscribe(userId, lastEventId);

		return new ResponseEntity<>(response, OK);
	}

	@GetMapping("/list")
	public ResponseEntity<?> alertList() {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		AlertListRes response = alertService.findAlerts(userId);

		return new ResponseEntity<>(ResponseDto.success(ALERT_LIST_OK, response), HttpStatus.OK);
	}

	@PatchMapping("/{alertId}")
	public ResponseEntity<?> alertReadModify(@PathVariable("alertId") Long alertId) {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		alertService.modifyAlertRead(userId, alertId);

		return new ResponseEntity<>(ResponseDto.success(ALERT_READ_MODIFIED, null), HttpStatus.OK);
	}

	@PatchMapping
	public ResponseEntity<?> alertAllReadModify() {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		alertService.modifyAlertAllRead(userId);

		return new ResponseEntity<>(ResponseDto.success(ALERT_READ_MODIFIED, null), HttpStatus.OK);
	}

	@DeleteMapping("/{alertId}")
	public ResponseEntity<?> alertDeletedModify(@PathVariable("alertId") Long alertId) {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		alertService.removeAlert(userId, alertId);

		return new ResponseEntity<>(ResponseDto.success(ALERT_DELETED, null), HttpStatus.OK);
	}

	@DeleteMapping
	public ResponseEntity<?> alertAllDeletedModify() {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		alertService.removeAllAlert(userId);

		return new ResponseEntity<>(ResponseDto.success(ALERT_DELETED, null), HttpStatus.OK);
	}

	@GetMapping("/{playerId}")
	public ResponseEntity<?> alertPlayer(@PathVariable("playerId") Long playerId) {
		alertService.sendPlayerAppearance(playerId);

		return new ResponseEntity<>(ResponseDto.success(ALERT_PLAYER_APPEARANCE_OK, null), HttpStatus.OK);
	}

	@GetMapping("/test")
	public ResponseEntity<?> test() {
		alertService.testAlert();
		return ResponseEntity.ok().build();
	}
}
