package com.youniform.api.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonTypeName("image")
public class DiaryImageObjectDto extends DiaryContentObjectDto {
	private double cropX;
	private double cropY;
	private String src;
	private String crossOrigin;
	private List<Object> filters;
}
