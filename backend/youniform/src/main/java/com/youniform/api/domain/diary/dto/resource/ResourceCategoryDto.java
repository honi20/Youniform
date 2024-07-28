package com.youniform.api.domain.diary.dto.resource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceCategoryDto {
	private String category;

	private List<ResourceItemDto> items;
}
