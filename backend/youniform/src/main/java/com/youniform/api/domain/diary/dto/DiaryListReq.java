package com.youniform.api.domain.diary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DiaryListReq {
	private LocalDate lastDiaryDate;
}
