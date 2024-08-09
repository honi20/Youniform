package com.youniform.api.domain.diary.dto.resource;

import com.youniform.api.domain.diary.entity.DiaryResource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceItemDto {
	private Long resourceId;

	private String imgUrl;

	public static ResourceItemDto toDto(DiaryResource resource) {
		return ResourceItemDto.builder()
				.resourceId(resource.getId())
				.imgUrl(resource.getImgUrl())
				.build();
	}
}
