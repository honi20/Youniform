package com.youniform.api.domain.diary.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DiaryContentDto {
	private String version;

	private List<DiaryContentObjectDto> objects;

	private String background;

	private DiaryImageObjectDto backgroundImage;
}
