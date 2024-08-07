package com.youniform.api.domain.photocard.service;

import com.youniform.api.domain.photocard.dto.PhotocardAddReq;
import com.youniform.api.domain.photocard.dto.PhotocardAddRes;
import com.youniform.api.domain.photocard.dto.PhotocardDeleteReq;
import com.youniform.api.domain.photocard.dto.PhotocardDetailDto;
import com.youniform.api.domain.photocard.entity.Photocard;
import com.youniform.api.domain.photocard.repository.PhotocardRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
public class PhotocardServiceImpl implements PhotocardService {
	private final PhotocardRepository photocardRepository;

	private final UserRepository userRepository;

	public PhotocardServiceImpl(UserRepository userRepository, PhotocardRepository photocardRepository) {
		this.userRepository = userRepository;
		this.photocardRepository = photocardRepository;
	}

	@Override
	public PhotocardAddRes addPhotocard(Long userId, PhotocardAddReq photocardAddReq) {
		Users user = userRepository.findById(userId)
				.orElseThrow(() -> new CustomException(USER_NOT_FOUND));

		Photocard photocard = photocardAddReq.toEntity(user);

		photocardRepository.save(photocard);

		return new PhotocardAddRes(photocard.getId());
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
		});

		photocardRepository.deleteAllById(photocardIdList);
	}
}
