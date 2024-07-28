package com.youniform.api.domain.photocard.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.youniform.api.domain.diary.dto.DiaryContentObjectDto;
import com.youniform.api.domain.diary.dto.DiaryImageObjectDto;
import com.youniform.api.domain.diary.dto.DiaryTextboxObjectDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Data
@NoArgsConstructor
@RedisHash("PhotocardContent")
public class PhotocardContentDto {
	private String version;

	private List<PhotocardContentObjectDto> objects;

	private String background;

	private DiaryImageObjectDto backgroundImage;
}
