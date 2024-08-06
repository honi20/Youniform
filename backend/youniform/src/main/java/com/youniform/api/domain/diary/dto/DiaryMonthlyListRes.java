package com.youniform.api.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryMonthlyListRes {
	private List<DiaryMonthlyDto> diaryList;
}
