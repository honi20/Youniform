package com.youniform.api.domain.photocard.service;

import com.youniform.api.domain.photocard.dto.PhotocardAddReq;
import com.youniform.api.domain.photocard.dto.PhotocardAddRes;
import com.youniform.api.domain.photocard.dto.PhotocardDetailDto;

public interface PhotocardService {
	PhotocardAddRes addPhotocard(Long userId, PhotocardAddReq photocardAddReq);

	PhotocardDetailDto findPhotocard(Long userId, Long photocardId);
}
