package com.youniform.api.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "type"
)
@JsonSubTypes({
		@JsonSubTypes.Type(value = DiaryImageObjectDto.class, name = "image"),
		@JsonSubTypes.Type(value = DiaryTextboxObjectDto.class, name = "textbox")
})
public abstract class DiaryContentObjectDto {
	private String type;
	private String version;
	private String originX;
	private String originY;
	private double left;
	private double top;
	private double width;
	private double height;
	private String fill;
	private String stroke;
	private double strokeWidth;
	private Object strokeDashArray;
	private String strokeLineCap;
	private double strokeDashOffset;
	private String strokeLineJoin;
	private boolean strokeUniform;
	private double strokeMiterLimit;
	private double scaleX;
	private double scaleY;
	private double angle;
	private boolean flipX;
	private boolean flipY;
	private double opacity;
	private Object shadow;
	private boolean visible;
	private String backgroundColor;
	private String fillRule;
	private String paintFirst;
	private String globalCompositeOperation;
	private double skewX;
	private double skewY;
}
