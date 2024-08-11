package com.youniform.api.domain.alert.dto;

import com.youniform.api.domain.alert.entity.Alert;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

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

	private Long pk;

	private Boolean isRead;

	private String createdAt;

	public static AlertDto toDto(Alert alert) {
		return AlertDto.builder()
				.alertId(alert.getId())
				.senderUuid(alert.getSender() != null ? alert.getSender().getUuid() : null)
				.senderNickname(alert.getSender() != null ? alert.getSender().getNickname() : null)
				.senderProfileUrl(alert.getSender() != null ? alert.getSender().getProfileUrl() : null)
				.type(String.valueOf(alert.getType()))
				.content(alert.getContent())
				.pk(alert.getPk() != null ? alert.getPk() : null)
				.isRead(alert.getIsRead())
				.createdAt(calculateTime(alert.getCreatedAt()))
				.build();
	}
}
