package com.youniform.api.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Data
@NoArgsConstructor
@RedisHash("DairyContent")
public class DiaryContentDto {
	private String version;

	@JsonTypeInfo(
			use = JsonTypeInfo.Id.NAME,
			include = JsonTypeInfo.As.PROPERTY,
			property = "type"
	)
	@JsonSubTypes({
			@JsonSubTypes.Type(value = DiaryImageObjectDto.class, name = "image"),
			@JsonSubTypes.Type(value = DiaryTextboxObjectDto.class, name = "textbox")
	})
	private List<DiaryContentObjectDto> objects;

	private String background;

	private DiaryImageObjectDto backgroundImage;
}
