package com.youniform.api.domain.photocard.dto;

import com.youniform.api.domain.photocard.entity.Photocard;
import com.youniform.api.domain.user.entity.Users;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardAddReq {
	@NotNull
	private String imgUrl;

	public Photocard toEntity(Users user) {
		return Photocard.builder()
				.user(user)
				.imgUrl(this.imgUrl)
				.createdAt(LocalDateTime.now())
				.build();
	}
}
