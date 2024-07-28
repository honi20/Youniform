package com.youniform.api.domain.photocard.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Getter
@NoArgsConstructor
public class PhotocardDetailDto {
	private String name;

	private String description;

	private PhotocardContentDto contents;

	private LocalDateTime createdAt;
}
