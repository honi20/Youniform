package com.youniform.api.domain.photocard.service;

import com.youniform.api.domain.photocard.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PhotocardService {
	PhotocardAddRes addPhotocard(Long userId, MultipartFile file) throws IOException;

	PhotocardDetailDto findPhotocard(Long userId, Long photocardId);

	void removePhotocard(Long userId, PhotocardDeleteReq photocardDeleteReq);

	PhotocardListRes findPhotocards(Long userId);
}
