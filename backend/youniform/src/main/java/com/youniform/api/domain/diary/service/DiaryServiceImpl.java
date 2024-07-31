package com.youniform.api.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static com.youniform.api.global.statuscode.ErrorCode.DIARY_NOT_FOUND;
import static com.youniform.api.global.statuscode.ErrorCode.STAMP_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {
	private final DiaryRepository diaryRepository;

	private final StampRepository stampRepository;

	private final RedisUtils redisUtils;

	private final ObjectMapper objectMapper;

	@Override
	@Transactional
	public DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq) throws JsonProcessingException {
		validateDiaryAddReq(diaryAddReq);

//		Users user = userRepository.findById(userId);
		Users user = Users.builder()
				.id(userId)
				.uuid("1604b772-adc0-4212-8a90-81186c57f598")
				.build();

		Optional<DiaryStamp> stamp = stampRepository.findById(diaryAddReq.getStampId());

		Diary diary = diaryAddReq.toEntity(user, stamp.get());
		diaryRepository.save(diary);

		DiaryContentRedisDto redisDto = DiaryContentRedisDto.builder()
				.userId(userId)
				.contents(diaryAddReq.getContents())
				.build();

		redisUtils.setData("diaryContents_"+diary.getId(), objectMapper.writeValueAsString(redisDto));

		return new DiaryAddRes(diary.getId());
	}

	@Override
	public DiaryDetailDto detailDiary(Long userId, Long diaryId) throws JsonProcessingException {
		Diary diary = diaryRepository.findById(diaryId)
				.orElseThrow(() -> new CustomException(DIARY_NOT_FOUND));

		// [TODO] 친구 여부에 따른 다이어리 공개 여부에 대한 유효성 검사

		String redisContents = (String) redisUtils.getData("diaryContents_" + diaryId);
		DiaryContentRedisDto redisDto = objectMapper.readValue(redisContents, DiaryContentRedisDto.class);

		return DiaryDetailDto.toDto(diary, redisDto.getContents());
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
