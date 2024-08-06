package com.youniform.api.domain.alert.dto;

import com.youniform.api.domain.alert.entity.Alert;
import com.youniform.api.domain.alert.entity.AlertType;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

import static com.youniform.api.global.dateformat.DateFormatter.calculateTime;

@Data
@AllArgsConstructor
@Builder
public class AlertDto {
	private Long alertId;

	private String senderUuid;

	private String senderNickname;

	private String senderProfileUrl;

	private String type;

	private String content;

	private String link;

	private Boolean isRead;

	private Boolean isDeleted;

	private String createdAt;

	public static AlertDto toDto(Alert alert) {
		return AlertDto.builder()
				.alertId(alert.getId())
				.senderUuid(alert.getSender().getUuid())
				.senderNickname(alert.getSender().getNickname())
				.senderProfileUrl(alert.getSender().getProfileUrl())
				.type(String.valueOf(alert.getType()))
				.content(alert.getContent())
				.link(alert.getLink())
				.isRead(alert.getIsRead())
				.isDeleted(alert.getIsDeleted())
				.createdAt(calculateTime(alert.getCreatedAt()))
				.build();
	}
}
