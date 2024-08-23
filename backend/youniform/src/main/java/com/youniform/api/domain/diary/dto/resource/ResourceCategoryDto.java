package com.youniform.api.domain.diary.dto.resource;

import com.youniform.api.domain.diary.entity.ResourceCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceCategoryDto {
	private String category;

	private List<ResourceItemDto> items;

	public static ResourceCategoryDto toDto(ResourceCategory category, List<ResourceItemDto> items) {
		return ResourceCategoryDto.builder()
				.category(String.valueOf(category))
				.items(items)
				.build();
	}
}
