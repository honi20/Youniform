package com.youniform.api.domain.photocard.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardDetailDto {
	private Long photocardId;

	private String imgUrl;

	private LocalDateTime createdAt;
}
