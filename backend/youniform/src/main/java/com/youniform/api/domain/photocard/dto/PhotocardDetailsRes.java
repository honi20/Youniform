package com.youniform.api.domain.photocard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardDetailsRes {
	private String name;

	private String description;

	private PhotocardContentDto contents;

	private LocalDateTime createdAt;
}
