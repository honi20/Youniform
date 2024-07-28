package com.youniform.api.domain.photocard.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotocardAddReq {
	@NotNull
	private String name;

	@NotNull
	private String description;

	@NotNull
	private PhotocardContentDto contents;
}
