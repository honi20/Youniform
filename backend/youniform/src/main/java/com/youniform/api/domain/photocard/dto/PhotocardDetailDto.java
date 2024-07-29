package com.youniform.api.domain.photocard.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardDetailDto {
	private String name;

	private String description;

	private PhotocardContentDto contents;

	private LocalDateTime createdAt;
}
