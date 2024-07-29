package com.youniform.api.domain.alert.controller;

import com.youniform.api.domain.alert.dto.AlertRes;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/alerts")
@RequiredArgsConstructor
@Validated
public class AlertController {

	@GetMapping("/subscribe")
	public ResponseEntity<?> subscribe(Authentication authentication,
								@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
		AlertRes response = AlertRes.builder()
				.eventId(1L)
				.content("youniform 님이 포스트에 댓글을 달았습니다.")
				.type("POST_COMMENT")
				.isRead(false)
				.createdAt(LocalDateTime.now())
				.link("http://youniform.com/posts/2")
				.build();

		return new ResponseEntity<>(ResponseDto.success(SuccessCode.ALERT_CONNECTION_OK, response), HttpStatus.OK);
	}
}
