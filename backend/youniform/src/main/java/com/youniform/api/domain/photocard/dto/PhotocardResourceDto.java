package com.youniform.api.domain.photocard.dto;

import com.youniform.api.domain.photocard.entity.PhotocardResourceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardResourceDto {
	private String type;

	private List<String> imgUrlList;

	public static PhotocardResourceDto toDto(PhotocardResourceType type, List<String> imgUrlList) {
		return PhotocardResourceDto.builder()
				.type(String.valueOf(type))
				.imgUrlList(imgUrlList)
				.build();
	}
}
