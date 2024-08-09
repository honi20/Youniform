package com.youniform.api.domain.alert.dto;

import com.youniform.api.domain.alert.entity.Alert;
import com.youniform.api.domain.alert.entity.AlertType;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class AlertReq {
	private Users receiver;

	private Users sender;

	private AlertType type;

	private String content;

	private String link;

	public Alert toEntity() {
		return Alert.builder()
				.receiver(this.receiver)
				.sender(this.sender)
				.type(this.type)
				.content(this.content)
				.link(this.link)
				.isRead(false)
				.createdAt(LocalDateTime.now())
				.build();
	}
}
