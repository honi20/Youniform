package com.youniform.api.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.*;
import com.youniform.api.domain.diary.entity.Diary;
import com.youniform.api.domain.diary.entity.DiaryResource;
import com.youniform.api.domain.diary.entity.DiaryStamp;
import com.youniform.api.domain.diary.entity.Scope;
import com.youniform.api.domain.diary.repository.DiaryCustomRepository;
import com.youniform.api.domain.diary.repository.DiaryRepository;
import com.youniform.api.domain.diary.repository.ResourceRepository;
import com.youniform.api.domain.diary.repository.StampRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.redis.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.youniform.api.domain.diary.validation.DiaryValidation.*;
import static com.youniform.api.global.statuscode.ErrorCode.*;
import static com.youniform.api.global.statuscode.ErrorCode.DIARY_UPDATE_FORBIDDEN;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {
	private final DiaryRepository diaryRepository;

	private final DiaryCustomRepository diaryCustomRepository;

	private final StampRepository stampRepository;

	private final ResourceRepository resourceRepository;

	private final RedisUtils redisUtils;

	private final ObjectMapper objectMapper;

	@Override
	@Transactional
	public DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq) throws JsonProcessingException {
		validateDiaryContent(diaryAddReq.getDiaryDate(), diaryAddReq.getContents(), diaryAddReq.getScope());

//		[TODO] Users user = userRepository.findById(userId);
		Users user = Users.builder()
				.id(userId)
				.uuid("1604b772-adc0-4212-8a90-81186c57f598")
				.build();

		DiaryStamp stamp = stampRepository.findById(diaryAddReq.getStampId())
				.orElseThrow(() -> new CustomException(STAMP_NOT_FOUND));

		Diary diary = diaryAddReq.toEntity(user, stamp);
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

		DiaryContentDto contents = getContentsFromRedis(diaryId);

		return DiaryDetailDto.toDto(diary, contents);
	}

	@Override
	public DiaryListRes findMyDiaries(Long userId, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException {
		LocalDate lastDiaryDate = diaryListReq.getLastDiaryDate();
		int pageSize = pageable.getPageSize();
		boolean isAscending = pageable.getSort().stream().anyMatch(Sort.Order::isAscending);

		List<Diary> diaries = diaryCustomRepository.findByUserIdAndCursor(userId, lastDiaryDate, pageSize, isAscending);

		List<DiaryListDto> diaryList = diaries.stream()
				.map(DiaryListDto::toDto)
				.toList();

		boolean hasNext = diaryList.size() > pageSize;
		if (hasNext) {
			diaryList.remove(pageSize);
		}

		SliceDto<DiaryListDto> sliceDto = new SliceDto<>(new SliceImpl<>(diaryList, pageable, hasNext));

		return DiaryListRes.builder()
				.diaryList(sliceDto)
				.build();
	}

	@Override
	public DiaryListRes findDiaries(String userUuid, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException {
//		[TODO] Users user = userRepository.findByUuid(userUuid).get(0);
//		[TODO] 유저 아이디 유효성 검사

		Users user = Users.builder()
				.id(123L)
				.uuid("1604b772-adc0-4212-8a90-81186c57f598")
				.build();

		LocalDate lastDiaryDate = diaryListReq.getLastDiaryDate();
		int pageSize = pageable.getPageSize();
		boolean isAscending = pageable.getSort().stream().anyMatch(Sort.Order::isAscending);

		List<Diary> diaries = diaryCustomRepository.findByUserIdAndCursor(user.getId(), lastDiaryDate, pageSize, isAscending);

		List<DiaryListDto> diaryList = diaries.stream()
				.map(DiaryListDto::toDto)
				.toList();

		boolean hasNext = diaryList.size() > pageSize;
		if (hasNext) {
			diaryList.remove(pageSize);
		}

		SliceDto<DiaryListDto> sliceDto = new SliceDto<>(new SliceImpl<>(diaryList, pageable, hasNext));

		return DiaryListRes.builder()
				.diaryList(sliceDto)
				.build();
	}

	@Override
	@Transactional
	public void modifyDiary(Long userId, Long diaryId, DiaryModifyReq diaryModifyReq) throws JsonProcessingException {
		validateDiaryContent(diaryModifyReq.getDiaryDate(), diaryModifyReq.getContents(), diaryModifyReq.getScope());

		Diary diary = diaryRepository.findById(diaryId)
				.orElseThrow(() -> new CustomException(DIARY_NOT_FOUND));

		if (!userId.equals(diary.getUser().getId())) {
			throw new CustomException(DIARY_UPDATE_FORBIDDEN);
		} else if (!diaryModifyReq.getDiaryDate().equals(diary.getDiaryDate().toString())) {
			throw new CustomException(DIARY_UPDATE_FORBIDDEN);
		}

		DiaryStamp stamp = stampRepository.findById(diaryModifyReq.getStampId())
				.orElseThrow(() -> new CustomException(STAMP_NOT_FOUND));

		diary.updateStamp(stamp);
		diary.updateScope(Scope.valueOf(diaryModifyReq.getScope()));
		diary.updateImgUrl(diaryModifyReq.getDiaryImgUrl());
		diaryRepository.save(diary);

		DiaryContentRedisDto redisDto = DiaryContentRedisDto.builder()
				.userId(diary.getId())
				.contents(diaryModifyReq.getContents())
				.build();

		redisUtils.setData("diaryContents_"+diary.getId(), objectMapper.writeValueAsString(redisDto));
	}

	@Override
	public void removeDiary(Long userId, Long diaryId) {
		Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(DIARY_NOT_FOUND));

		if (!userId.equals(diary.getUser().getId())) {
			throw new CustomException(DIARY_UPDATE_FORBIDDEN);
		}

		redisUtils.deleteData("diaryContents_" + diary.getId());

		diaryRepository.deleteById(diaryId);
	}

	@Override
	public ResourceListRes findDiaryResources() {
		List<ResourceDto> resourceList = resourceRepository.findAll().stream()
				.collect(Collectors.groupingBy(DiaryResource::getType))
				.entrySet().stream()
				.map(typeEntry -> ResourceDto.toDto(
						typeEntry.getKey(),
						typeEntry.getValue().stream()
								.collect(Collectors.groupingBy(DiaryResource::getCategory))
								.entrySet().stream()
								.map(categoryEntry -> ResourceCategoryDto.toDto(
										categoryEntry.getKey(),
										categoryEntry.getValue().stream()
												.map(ResourceItemDto::toDto)
												.collect(Collectors.toList())))
								.collect(Collectors.toList())))
				.collect(Collectors.toList());

		return new ResourceListRes(resourceList);
	}

	@Override
	public StampListRes findDiaryStamps() {
		List<StampDto> stampList = stampRepository.findAll()
				.stream()
				.map(StampDto::toDto)
				.collect(Collectors.toList());

		return new StampListRes(stampList);
	}

	private DiaryContentDto getContentsFromRedis(Long diaryId) throws JsonProcessingException {
		String redisContents = (String) redisUtils.getData("diaryContents_" + diaryId);
		DiaryContentRedisDto redisDto = objectMapper.readValue(redisContents, DiaryContentRedisDto.class);

		return redisDto.getContents();
	}

	private void validateDiaryContent(String diaryDate, DiaryContentDto contents, String scope) throws JsonProcessingException {
		isInvalidDate(diaryDate);
		isInvalidContents(contents);
		isInvalidScope(scope);
	}
}
