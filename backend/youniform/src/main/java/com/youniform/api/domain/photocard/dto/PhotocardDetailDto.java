package com.youniform.api.domain.photocard.dto;

import com.youniform.api.domain.photocard.entity.Photocard;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardDetailDto {
	private Long photocardId;

	private String imgUrl;

	public static PhotocardDetailDto toDto(Photocard photocard) {
		return PhotocardDetailDto.builder()
				.photocardId(photocard.getId())
				.imgUrl(photocard.getImgUrl())
				.build();
	}
}
