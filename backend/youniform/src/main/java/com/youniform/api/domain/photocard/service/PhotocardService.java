package com.youniform.api.domain.photocard.service;

import com.youniform.api.domain.photocard.dto.*;

public interface PhotocardService {
	PhotocardAddRes addPhotocard(Long userId, PhotocardAddReq photocardAddReq);

	PhotocardDetailDto findPhotocard(Long userId, Long photocardId);

	void removePhotocard(Long userId, PhotocardDeleteReq photocardDeleteReq);

	PhotocardListRes findPhotocards(Long userId);
}
