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
import com.youniform.api.domain.friend.entity.Friend;
import com.youniform.api.domain.friend.entity.FriendPK;
import com.youniform.api.domain.friend.entity.Status;
import com.youniform.api.domain.friend.repository.FriendRepository;
import com.youniform.api.domain.friend.service.FriendService;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.redis.RedisUtils;
import com.youniform.api.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import static com.youniform.api.domain.diary.validation.DiaryValidation.*;
import static com.youniform.api.domain.friend.entity.Status.FRIEND;
import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {
	private final DiaryRepository diaryRepository;

	private final DiaryCustomRepository diaryCustomRepository;

	private final StampRepository stampRepository;

	private final ResourceRepository resourceRepository;

	private final RedisUtils redisUtils;

	private final ObjectMapper objectMapper;

	private final UserRepository userRepository;

	private final S3Service s3Service;

	private final FriendService friendService;

	private final FriendRepository friendRepository;

	@Override
	@Transactional
	public DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq, MultipartFile file) throws IOException {
		validateDiaryContent(diaryAddReq.getDiaryDate(), diaryAddReq.getContents(), diaryAddReq.getScope());

		Users user = userRepository.findById(userId)
				.orElseThrow(() -> new CustomException(USER_NOT_FOUND));

		DiaryStamp stamp = stampRepository.findById(diaryAddReq.getStampId())
				.orElseThrow(() -> new CustomException(STAMP_NOT_FOUND));

		Diary diary;

		if (file.isEmpty()) {
			diary = diaryAddReq.toEntity(user, stamp);
		} else {
			String imgUrl = s3Service.upload(file, "diary");
			diary = diaryAddReq.toEntity(user, stamp, imgUrl);
		}

		diaryRepository.save(diary);

		DiaryContentRedisDto redisDto = DiaryContentRedisDto.builder()
				.userId(userId)
				.contents(diaryAddReq.getContents())
				.build();

		redisUtils.setData("diaryContents_"+diary.getId(), objectMapper.writeValueAsString(redisDto));

		user.updateLastWriteDiary(LocalDateTime.now());

		return new DiaryAddRes(diary.getId());
	}

	@Override
	public DiaryDetailDto detailDiary(Long userId, Long diaryId) throws JsonProcessingException {
		Diary diary = diaryRepository.findById(diaryId)
				.orElseThrow(() -> new CustomException(DIARY_NOT_FOUND));

		Users writer = diary.getUser();

		Status status = friendService.isFriend(userId, writer.getId());
		boolean isFriend = (status == Status.FRIEND);

		if (userId != writer.getId()) {
			isForbiddenDiary(diary.getScope(), isFriend);
		}

		DiaryContentDto contents = getContentsFromRedis(diaryId);

		return DiaryDetailDto.toDto(diary, contents);
	}

	@Override
	public DiaryListRes findMyDiaries(Long userId, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException {
		LocalDate lastDiaryDate = diaryListReq.getLastDiaryDate();
		int pageSize = pageable.getPageSize();
		boolean isAscending = pageable.getSort().stream().anyMatch(Sort.Order::isAscending);

		List<Diary> diaries = diaryCustomRepository.findByUserIdAndCursor(userId, null, lastDiaryDate, pageSize, isAscending, true);

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
	public DiaryListRes findDiaries(Long userId, String friendUuid, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException {
		Users user = userRepository.findById(userId)
				.orElseThrow(() -> new CustomException(USER_NOT_FOUND));

		Users friend = userRepository.findByUuid(friendUuid)
				.orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

		Status status = friendService.isFriend(userId, friend.getId());

		if (status == Status.FRIEND) {
			FriendPK friendPk = new FriendPK(user.getId(), friend.getId());
			Friend friendRequest = friendRepository.findByFriendPK(friendPk);

			friendRequest.updateLastVisited(LocalDateTime.now());

			friendRepository.save(friendRequest);
		}

		LocalDate lastDiaryDate = diaryListReq.getLastDiaryDate();
		int pageSize = pageable.getPageSize();
		boolean isAscending = pageable.getSort().stream().anyMatch(Sort.Order::isAscending);

		List<Diary> diaries = diaryCustomRepository.findByUserIdAndCursor(friend.getId(), status, lastDiaryDate, pageSize, isAscending, false);

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
	public DiaryMonthlyListRes findMyMonthlyDiaries(Long userId, DiaryMonthlyListReq diaryMonthlyListReq) throws JsonProcessingException {
		isInvalidCalendarDate(diaryMonthlyListReq.getCalendarDate() + "-01");

		LocalDate date = LocalDate.parse(diaryMonthlyListReq.getCalendarDate() + "-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		List<Diary> diaries = diaryCustomRepository.findByUserIdAndDate(userId, null, date, true);

		List<DiaryMonthlyDto> diaryList = diaries.stream()
				.map(DiaryMonthlyDto::toDto)
				.toList();

		return new DiaryMonthlyListRes(diaryList);
	}

	@Override
	public DiaryMonthlyListRes findMonthlyDiaries(Long userId, String friendUuid, DiaryMonthlyListReq diaryMonthlyListReq) throws JsonProcessingException {
		isInvalidCalendarDate(diaryMonthlyListReq.getCalendarDate() + "-01");

		Users friend = userRepository.findByUuid(friendUuid)
				.orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

		Status status = friendService.isFriend(userId, friend.getId());

		LocalDate date = LocalDate.parse(diaryMonthlyListReq.getCalendarDate() + "-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));

		List<Diary> diaries = diaryCustomRepository.findByUserIdAndDate(friend.getId(), status, date, false);

		List<DiaryMonthlyDto> diaryList = diaries.stream()
				.map(DiaryMonthlyDto::toDto)
				.toList();

		return new DiaryMonthlyListRes(diaryList);
	}

	@Override
	@Transactional
	public void modifyDiary(Long userId, Long diaryId, DiaryModifyReq diaryModifyReq, MultipartFile file) throws IOException {
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

		if (!file.isEmpty()) {
			if (diary.getImgUrl() != null) {
				s3Service.fileDelete(diary.getImgUrl());
			}

			String imgUrl = s3Service.upload(file, "diary");;
			diary.updateImgUrl(imgUrl);
		}

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

		if (diary.getImgUrl() != null) {
			s3Service.fileDelete(diary.getImgUrl());
		}
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
