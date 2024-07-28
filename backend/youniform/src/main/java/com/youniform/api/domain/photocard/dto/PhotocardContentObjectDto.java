package com.youniform.api.domain.photocard.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Getter
@NoArgsConstructor
public class PhotocardContentObjectDto {
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
	private double cropX;
	private double cropY;
	private String src;
	private String crossOrigin;
	private List<Object> filters;
}
