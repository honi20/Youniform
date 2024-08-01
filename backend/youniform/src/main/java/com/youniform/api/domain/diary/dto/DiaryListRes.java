package com.youniform.api.domain.diary.dto;

import com.youniform.api.global.dto.SliceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class DiaryListRes {
	private SliceDto<DiaryDetailDto> diaryList;
}
