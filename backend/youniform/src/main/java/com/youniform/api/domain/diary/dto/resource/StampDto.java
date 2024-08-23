package com.youniform.api.domain.diary.dto.resource;

import com.youniform.api.domain.diary.entity.DiaryStamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StampDto {
	private Long stampId;

	private String imgUrl;

	public static StampDto toDto(DiaryStamp stamp) {
		return StampDto.builder()
				.stampId(stamp.getId())
				.imgUrl(stamp.getImgUrl())
				.build();
	}
}
