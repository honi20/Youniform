package com.youniform.api.domain.photocard.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.photocard.dto.PhotocardAddReq;
import com.youniform.api.domain.photocard.dto.PhotocardContentDto;
import com.youniform.api.domain.photocard.dto.PhotocardContentObjectDto;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;

import static com.youniform.api.domain.diary.util.DiaryTestUtil.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public class PhotocardTestUtil {
	public static PhotocardAddReq getPhotocardAddReq(String name, String description, PhotocardContentDto photocardContentDto) {
		return PhotocardAddReq.builder()
				.name(name)
				.description(description)
				.contents(photocardContentDto)
				.build();
	}

	public static PhotocardContentDto getPhotocardContentDto() throws JsonProcessingException {
		List<PhotocardContentObjectDto> objects = new ArrayList<>();

		ObjectMapper mapper = new ObjectMapper();
		PhotocardContentObjectDto object = mapper.readValue(getImageJson(), PhotocardContentObjectDto.class);
		objects.add(object);

		return PhotocardContentDto.builder()
				.version("6.0.2")
				.objects(objects)
				.background("white")
				.backgroundImage(object)
				.build();
	}

	public static List<FieldDescriptor> getPhotocardFields(String prefix) {
		List<FieldDescriptor> fields = new ArrayList<>();

		if (!prefix.equals("")) {
			fields.add(fieldWithPath(prefix + "createdAt").type(JsonFieldType.STRING)
					.description("포토카드 생성일"));
		}
		fields.add(fieldWithPath(prefix + "name").type(JsonFieldType.STRING)
				.description("포토카드 이름"));
		fields.add(fieldWithPath(prefix + "description").type(JsonFieldType.STRING)
				.description("포토카드 설명"));
		fields.add(fieldWithPath(prefix + "contents.version").type(JsonFieldType.STRING)
				.description("버전"));
		fields.add(fieldWithPath(prefix + "contents.objects").type(JsonFieldType.ARRAY)
				.description("포토카드 내용 객체 배열"));
		fields.add(fieldWithPath(prefix + "contents.background").type(JsonFieldType.STRING)
				.description("배경"));
		fields.add(fieldWithPath(prefix + "contents.backgroundImage").type(JsonFieldType.OBJECT)
				.description("배경 객체"));

		fields.addAll(getObjectFields(prefix + "contents.objects[]"));
		fields.addAll(getObjectFields(prefix + "contents.backgroundImage"));
		return fields;
	}
}
