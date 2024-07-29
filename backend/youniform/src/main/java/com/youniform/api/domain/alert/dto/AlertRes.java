package com.youniform.api.domain.alert.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AlertRes {
	private Long eventId;

	private String content;

	private String type;

	private Boolean isRead;

	private String createdAt;

	private String link;
}
