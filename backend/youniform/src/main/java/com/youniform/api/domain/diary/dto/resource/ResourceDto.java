package com.youniform.api.domain.diary.dto.resource;

import com.youniform.api.domain.diary.entity.ResourceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceDto {
	private String type;

	private List<ResourceCategoryDto> categories;

	public static ResourceDto toDto(ResourceType type, List<ResourceCategoryDto> categories) {
		return ResourceDto.builder()
				.type(String.valueOf(type))
				.categories(categories)
				.build();
	}
}
