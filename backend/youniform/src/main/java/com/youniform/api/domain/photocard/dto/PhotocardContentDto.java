package com.youniform.api.domain.photocard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash("PhotocardContent")
public class PhotocardContentDto {
	private String version;

	private List<PhotocardContentObjectDto> objects;

	private String background;

	private PhotocardContentObjectDto backgroundImage;
}
