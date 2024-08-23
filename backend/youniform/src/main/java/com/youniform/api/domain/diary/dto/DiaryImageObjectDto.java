package com.youniform.api.domain.diary.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class DiaryImageObjectDto extends DiaryContentObjectDto {
	private double cropX;
	private double cropY;
	private String src;
	private String crossOrigin;
	private List<Object> filters;

	public DiaryImageObjectDto() {
		this.setType("image");
	}
}
