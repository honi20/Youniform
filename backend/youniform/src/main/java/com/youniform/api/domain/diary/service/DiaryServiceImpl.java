package com.youniform.api.domain.diary.service;

import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.entity.Diary;
import com.youniform.api.domain.diary.entity.DiaryStamp;
import com.youniform.api.domain.diary.repository.DiaryRepository;
import com.youniform.api.domain.diary.repository.StampRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.redis.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.youniform.api.domain.diary.validation.DiaryValidation.*;
import static com.youniform.api.global.statuscode.ErrorCode.STAMP_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {
	private final DiaryRepository diaryRepository;

	private final StampRepository stampRepository;

	private final RedisUtils redisUtils;

	@Override
	@Transactional
	public DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq) {
		validateDiaryAddReq(diaryAddReq);

//		Users user = userRepository.findById(userId);
		Users user = Users.builder()
				.id(userId)
				.uuid("1604b772-adc0-4212-8a90-81186c57f598")
				.build();

		Optional<DiaryStamp> stamp = stampRepository.findById(diaryAddReq.getStampId());

		Diary diary = diaryAddReq.toEntity(user, stamp.get());
		diaryRepository.save(diary);

		redisUtils.setData("diaryContent_"+diary.getId(),
				DiaryContentRedisDto.builder()
						.userId(userId)
						.contents(diaryAddReq.getContents())
						.build().toString());

		return new DiaryAddRes(diary.getId());
	}

	private void validateDiaryAddReq(DiaryAddReq diaryAddReq) {
		isInvalidDate(diaryAddReq.getDiaryDate());
		isInvalidContents(diaryAddReq.getContents());
		isInvalidScope(diaryAddReq.getScope());

		if (!stampRepository.existsById(diaryAddReq.getStampId())) {
			throw new CustomException(STAMP_NOT_FOUND);
		}
	}
}
