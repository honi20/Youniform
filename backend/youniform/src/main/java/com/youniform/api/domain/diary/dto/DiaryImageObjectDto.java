package com.youniform.api.domain.diary.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class DiaryImageObjectDto extends DiaryContentObjectDto {
	private double cropX;
	private double cropY;
	private String src;
	private String crossOrigin;
	private List<Object> filters;
}
