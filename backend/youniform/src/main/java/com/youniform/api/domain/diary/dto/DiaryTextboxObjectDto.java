package com.youniform.api.domain.diary.dto;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
public class DiaryTextboxObjectDto extends DiaryContentObjectDto {
	private String fontFamily;
	private String fontWeight;
	private int fontSize;
	private String text;
	private boolean underline;
	private boolean overline;
	private boolean linethrough;
	private String textAlign;
	private String fontStyle;
	private double lineHeight;
	private String textBackgroundColor;
	private int charSpacing;
	private Object styles;
	private String direction;
	private String path;
	private double pathStartOffset;
	private String pathSide;
	private String pathAlign;
	private int minWidth;
	private boolean splitByGrapheme;

	public DiaryTextboxObjectDto() {
		this.setType("textbox");
	}
}
