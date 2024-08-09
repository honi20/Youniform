package com.youniform.api.domain.photocard.service;

import com.youniform.api.domain.photocard.dto.*;
import com.youniform.api.domain.photocard.entity.Photocard;
import com.youniform.api.domain.photocard.repository.PhotocardRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class PhotocardServiceImpl implements PhotocardService {
	private final PhotocardRepository photocardRepository;

	private final UserRepository userRepository;

	private final S3Service s3Service;

	@Override
	public PhotocardAddRes addPhotocard(Long userId, MultipartFile file) throws IOException {
		Users user = userRepository.findById(userId)
				.orElseThrow(() -> new CustomException(USER_NOT_FOUND));

		if (!file.isEmpty()) {
			String imgUrl = s3Service.upload(file, "photocard");
			Photocard photocard = Photocard.builder()
					.user(user)
					.imgUrl(imgUrl)
					.createdAt(LocalDateTime.now())
					.build();

			photocardRepository.save(photocard);

			return new PhotocardAddRes(photocard.getId());
		}

		return new PhotocardAddRes(null);
	}

	@Override
	public PhotocardDetailDto findPhotocard(Long userId, Long photocardId) {
		Photocard photocard = photocardRepository.findById(photocardId)
				.orElseThrow(() -> new CustomException(PHOTOCARD_NOT_FOUND));

		if (!photocard.getUser().getId().equals(userId)) {
			throw new CustomException(PHOTOCARD_ACCESS_FORBIDDEN);
		}

		return PhotocardDetailDto.toDto(photocard);
	}

	@Override
	public void removePhotocard(Long userId, PhotocardDeleteReq photocardDeleteReq) {
		if (photocardDeleteReq.getPhotocardIdList() == null)
			return;

		List<Long> photocardIdList = photocardDeleteReq.getPhotocardIdList();

		photocardIdList.forEach(photocardId -> {
			Photocard photocard = photocardRepository.findById(photocardId)
					.orElseThrow(() -> new CustomException(PHOTOCARD_NOT_FOUND));

			if (!photocard.getUser().getId().equals(userId)) {
				throw new CustomException(PHOTOCARD_ACCESS_FORBIDDEN);
			}

			if (photocard.getImgUrl() != null) {
				s3Service.fileDelete(photocard.getImgUrl());
			}
		});

		photocardRepository.deleteAllById(photocardIdList);
	}

	@Override
	public PhotocardListRes findPhotocards(Long userId) {
		List<Photocard> photocards = photocardRepository.findByUserId(userId);

		List<PhotocardDetailDto> photocardList = photocards.stream()
				.map(PhotocardDetailDto::toDto)
				.toList();

		return new PhotocardListRes(photocardList);
	}
}
