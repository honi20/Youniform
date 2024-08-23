package com.youniform.api.domain.photocard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardResourceListRes {
	private List<PhotocardResourceDto> resourceList;
}
