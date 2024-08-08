package com.youniform.api.domain.diary.dto;

import com.youniform.api.domain.diary.entity.Diary;
import com.youniform.api.domain.diary.entity.DiaryStamp;
import com.youniform.api.domain.diary.entity.Scope;
import com.youniform.api.domain.user.entity.Users;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

	public Diary toEntity(Users user, DiaryStamp stamp) {
		return Diary.builder()
				.user(user)
				.stamp(stamp)
				.diaryDate(LocalDate.parse(this.diaryDate))
				.scope(Scope.valueOf(this.scope))
				.build();
	}

	public Diary toEntity(Users user, DiaryStamp stamp, String imgUrl) {
		return Diary.builder()
				.user(user)
				.stamp(stamp)
				.diaryDate(LocalDate.parse(this.diaryDate))
				.scope(Scope.valueOf(this.scope))
				.imgUrl(imgUrl)
				.build();
	}
}
