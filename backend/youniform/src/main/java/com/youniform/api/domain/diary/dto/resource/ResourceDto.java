package com.youniform.api.domain.diary.dto.resource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceDto {
	private String type;

	private List<ResourceCategoryDto> categories;
}
