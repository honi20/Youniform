package com.youniform.api.domain.photocard.service;

import com.youniform.api.domain.photocard.dto.PhotocardAddReq;
import com.youniform.api.domain.photocard.dto.PhotocardAddRes;

public interface PhotocardService {
	PhotocardAddRes addPhotocard(Long userId, PhotocardAddReq photocardAddReq);
}
