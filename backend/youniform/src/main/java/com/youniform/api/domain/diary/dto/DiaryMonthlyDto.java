package com.youniform.api.domain.diary.dto;

import com.youniform.api.domain.diary.entity.Diary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryMonthlyDto {
	private Long diaryId;

	private LocalDate diaryDate;

	private String stampImgUrl;

	public static DiaryMonthlyDto toDto(Diary diary) {
		return DiaryMonthlyDto.builder()
				.diaryId(diary.getId())
				.diaryDate(diary.getDiaryDate())
				.stampImgUrl(diary.getStamp().getImgUrl())
				.build();
	}
}
