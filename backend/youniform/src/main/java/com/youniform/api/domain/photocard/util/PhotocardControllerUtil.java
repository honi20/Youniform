package com.youniform.api.domain.photocard.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.photocard.dto.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PhotocardControllerUtil {
	public static PhotocardDetailsRes getPhotocardDetailsRes() throws JsonProcessingException {
		return PhotocardDetailsRes.builder()
				.name("도영이")
				.description("도영이 홈런 친 날")
				.contents(getPhotocardContent())
				.createdAt(LocalDateTime.now())
				.build();
	}

	public static PhotocardListRes getPhotocardListRes() throws JsonProcessingException {
		List<PhotocardDetailDto> photocardList = new ArrayList<>();
		photocardList.add(getPhotocardListDetails("도영이", "도영이 홈런"));
		photocardList.add(getPhotocardListDetails("대호대호", "이대호 최강야구 최애 짤"));

		return new PhotocardListRes(photocardList);
	}

	private static PhotocardDetailDto getPhotocardListDetails(String name, String description) throws JsonProcessingException {
		return PhotocardDetailDto.builder()
				.name(name)
				.description(description)
				.contents(getPhotocardContent())
				.createdAt(LocalDateTime.now())
				.build();
	}

	public static PhotocardContentDto getPhotocardContent() throws JsonProcessingException {
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

		List<PhotocardContentObjectDto> objects = new ArrayList<>();

		ObjectMapper mapper = new ObjectMapper();
		PhotocardContentObjectDto imageObj = mapper.readValue(imageJson, PhotocardContentObjectDto.class);
		objects.add(imageObj);

		return PhotocardContentDto.builder()
				.version("6.0.2")
				.objects(objects)
				.background("white")
				.backgroundImage(imageObj)
				.build();
	}
}
