package com.youniform.api.domain.diary.dto;

import com.youniform.api.domain.diary.entity.Diary;
import com.youniform.api.domain.diary.entity.Scope;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryListDto {
	private Long diaryId;

	private String nickname;

	private String profileUrl;

	private LocalDate diaryDate;

	private Scope scope;

	private String stampImgUrl;

	private String diaryImgUrl;

	public static DiaryListDto toDto(Diary diary) {
		return DiaryListDto.builder()
				.diaryId(diary.getId())
				.nickname(diary.getUser().getNickname())
				.profileUrl(diary.getUser().getProfileUrl())
				.diaryDate(diary.getDiaryDate())
				.scope(diary.getScope())
				.stampImgUrl(diary.getStamp().getImgUrl())
				.diaryImgUrl(diary.getImgUrl())
				.build();
	}
}
