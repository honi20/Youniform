package com.youniform.api.domain.diary.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryAddReq {
	@NotNull
	private String diaryDate;

	@NotNull
	private DiaryContentDto contents;

	@NotNull
	private String scope;

	@NotNull
	private Long stampId;
}
