package com.youniform.api.domain.photocard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotocardListRes {
	private List<PhotocardDetailDto> photocardList;
}
