package com.youniform.api.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryDetailDto {
	private Long writerId;

	private LocalDate diaryDate;

	private DiaryContentDto contents;

	private String scope;

	private String stampImgUrl;
}
