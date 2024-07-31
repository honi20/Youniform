package com.youniform.api.domain.diary.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.*;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.statuscode.ErrorCode;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DiaryControllerUtil {
//	public static DiaryListRes getDiaryListRes() throws JsonProcessingException {
//		List<DiaryDetailDto> diaryList = new ArrayList<>();
//		diaryList.add(getDiaryListDetailsExample(1L, "2024-07-24", "ALL"));
//		diaryList.add(getDiaryListDetailsExample(1L, "2024-03-15", "PRIVATE"));
//
//		return new DiaryListRes(diaryList);
//	}
//
//	public static DiaryDetailDto getDiaryListDetailsExample(Long writerId, String diaryDate, String scope) throws JsonProcessingException {
//		return new DiaryDetailDto(writerId, LocalDate.parse(diaryDate), getDiaryContent(), scope, "https://cdn.pixabay.com/photo/2016/04/27/18/31/minion-1357220_960_720.jpg");
//	}

	public static ResourceListRes getDiaryResourceRes() {
		ResourceItemDto item1 = new ResourceItemDto("Item1", "http://example.com/item1.png");
		ResourceItemDto item2 = new ResourceItemDto("Item2", "http://example.com/item2.png");
		ResourceItemDto item3 = new ResourceItemDto("Sticker_baseball", "http://example.com/sticker_baseball.png");
		ResourceItemDto item4 = new ResourceItemDto("Sticker_retro", "http://example.com/sticker_retro.png");
		ResourceItemDto item5 = new ResourceItemDto("Sticker_cute", "http://example.com/sticker_cute.png");
		ResourceItemDto item6 = new ResourceItemDto("Sticker_letter", "http://example.com/sticker_letter.png");

		ResourceCategoryDto category1 = new ResourceCategoryDto("NONE", List.of(item1, item2));
		ResourceCategoryDto category2 = new ResourceCategoryDto("BASEBALL", List.of(item3));
		ResourceCategoryDto category3 = new ResourceCategoryDto("RETRO", List.of(item4));
		ResourceCategoryDto category4 = new ResourceCategoryDto("CUTE", List.of(item5));
		ResourceCategoryDto category5 = new ResourceCategoryDto("LETTER", List.of(item6));

		ResourceDto resource1 = new ResourceDto("BACKGROUND", List.of(category1));
		ResourceDto resource2 = new ResourceDto("STICKER", List.of(category2, category3, category4, category5));
		ResourceDto resource3 = new ResourceDto("THEME", List.of(category1));

		StampDto stamp1 = new StampDto(1L, "Stamp1", "http://example.com/stamp1.png");
		StampDto stamp2 = new StampDto(2L, "Stamp2", "http://example.com/stamp2.png");

		return new ResourceListRes(List.of(resource1, resource2, resource3), List.of(stamp1, stamp2));
	}

	public static DiaryContentDto getDiaryContent() throws JsonProcessingException {
		String imageJson = """
			{
			    "type": "image",
			    "version": "5.3.0",
			    "originX": "center",
			    "originY": "center",
			    "left": 290.02,
			    "top": 415.57,
			    "width": 312,
			    "height": 312,
			    "fill": "rgb(0,0,0)",
			    "stroke": null,
			    "strokeWidth": 0,
			    "strokeDashArray": null,
			    "strokeLineCap": "butt",
			    "strokeDashOffset": 0,
			    "strokeLineJoin": "miter",
			    "strokeUniform": false,
			    "strokeMiterLimit": 4,
			    "scaleX": 0.6,
			    "scaleY": 0.6,
			    "angle": 0,
			    "flipX": false,
			    "flipY": false,
			    "opacity": 1,
			    "shadow": null,
			    "visible": true,
			    "backgroundColor": "",
			    "fillRule": "nonzero",
			    "paintFirst": "fill",
			    "globalCompositeOperation": "source-over",
			    "skewX": 0,
			    "skewY": 0,
			    "cropX": 0,
			    "cropY": 0,
			    "src": "http://localhost:5173/src/assets/stickers/sticker3.png",
			    "crossOrigin": null,
			    "filters": []
			}
			""";

		String textboxJson = """
			{
				"type": "textbox",
				"version": "5.3.0",
				"originX": "center",
				"originY": "center",
				"left": 196.19,
				"top": 194.38,
				"width": 136.95,
				"height": 33.9,
				"fill": "#000000",
				"stroke": null,
				"strokeWidth": 1,
				"strokeDashArray": null,
				"strokeLineCap": "butt",
				"strokeDashOffset": 0,
				"strokeLineJoin": "miter",
				"strokeUniform": false,
				"strokeMiterLimit": 4,
				"scaleX": 2.35,
				"scaleY": 2.35,
				"angle": 344.82,
				"flipX": false,
				"flipY": false,
				"opacity": 1,
				"shadow": null,
				"visible": true,
				"backgroundColor": "",
				"fillRule": "nonzero",
				"paintFirst": "fill",
				"globalCompositeOperation": "source-over",
				"skewX": 0,
				"skewY": 0,
				"fontFamily": "RascalMedium",
				"fontWeight": "normal",
				"fontSize": 30,
				"text": "최강기아!!!",
				"underline": false,
				"overline": false,
				"linethrough": false,
				"textAlign": "left",
				"fontStyle": "normal",
				"lineHeight": 1.16,
				"textBackgroundColor": "",
				"charSpacing": 0,
				"styles": [],
				"direction": "ltr",
				"path": null,
				"pathStartOffset": 0,
				"pathSide": "left",
				"pathAlign": "baseline",
				"minWidth": 20,
				"splitByGrapheme": false
			}
			""";

		List<DiaryContentObjectDto> objects = new ArrayList<>();

		ObjectMapper mapper = new ObjectMapper();
		DiaryContentObjectDto imageObj = mapper.readValue(imageJson, DiaryImageObjectDto.class);
		objects.add(imageObj);
		DiaryContentObjectDto textboxObj = mapper.readValue(textboxJson, DiaryTextboxObjectDto.class);
		objects.add(textboxObj);

		DiaryContentDto diaryContentDto = new DiaryContentDto();
		diaryContentDto.setVersion("6.0.2");
		diaryContentDto.setObjects(objects);
		diaryContentDto.setBackground("white");

		diaryContentDto.setBackgroundImage((DiaryImageObjectDto) imageObj);

		return diaryContentDto;
	}
}
