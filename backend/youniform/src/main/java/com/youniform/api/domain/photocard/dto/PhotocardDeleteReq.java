package com.youniform.api.domain.photocard.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhotocardDeleteReq {
	private List<Long> photocardIdList;
}
