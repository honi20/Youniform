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
public class DiaryDetailDto {
	private Long diaryId;

	private String nickname;

	private String profileUrl;

	private LocalDate diaryDate;

	private DiaryContentDto contents;

	private Scope scope;

	private String stampImgUrl;

	private String diaryImgUrl;

	public static DiaryDetailDto toDto(Diary diary, DiaryContentDto contents) {
		return DiaryDetailDto.builder()
				.diaryId(diary.getId())
				.nickname(diary.getUser().getNickname())
				.profileUrl(diary.getUser().getProfileUrl())
				.diaryDate(diary.getDiaryDate())
				.contents(contents)
				.scope(diary.getScope())
				.stampImgUrl(diary.getStamp().getImgUrl())
				.diaryImgUrl(diary.getImgUrl())
				.build();
	}
}
