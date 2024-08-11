package com.youniform.api.domain.alert.dto;

import com.mongodb.lang.Nullable;
import com.youniform.api.domain.alert.entity.Alert;
import com.youniform.api.domain.alert.entity.AlertType;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlertReq {
	private Users receiver;

	@Nullable
	private Users sender;

	private AlertType type;

	private String content;

	private Long pk;

	public Alert toEntity(Users sender) {
		return Alert.builder()
				.receiver(this.receiver)
				.sender(sender)
				.type(this.type)
				.content(this.content)
				.pk(this.pk)
				.isRead(false)
				.createdAt(LocalDateTime.now())
				.build();
	}
}
