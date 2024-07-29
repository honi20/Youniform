package com.youniform.api.domain.alert.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertRes {
	private Long eventId;

	private String content;

	private String type;

	private Boolean isRead;

	private LocalDateTime createdAt;

	private String link;
}
