package com.youniform.api.domain.alert.controller;

import com.youniform.api.domain.alert.service.AlertService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

import static com.youniform.api.global.statuscode.SuccessCode.ALERT_CONNECTION_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/alerts")
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

	@GetMapping("/test")
	public ResponseEntity<?> test() {
		alertService.testAlert();
		return ResponseEntity.ok().build();
	}
}
