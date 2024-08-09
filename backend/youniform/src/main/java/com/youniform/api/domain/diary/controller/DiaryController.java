package com.youniform.api.domain.diary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.ResourceListRes;
import com.youniform.api.domain.diary.dto.resource.StampListRes;
import com.youniform.api.domain.diary.service.DiaryService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequestMapping("/diaries")
@RequiredArgsConstructor
@Validated
public class DiaryController {
	private final DiaryService diaryService;

	private final JwtService jwtService;

	@PostMapping
	public ResponseEntity<?> diaryAdd(
			@RequestPart(value = "dto") DiaryAddReq diaryAddReq,
			@RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryAddRes response = diaryService.addDiary(userId, diaryAddReq, file);

		return new ResponseEntity<>(ResponseDto.success(DIARY_CREATED, response), HttpStatus.CREATED);
	}

	@GetMapping("/{diaryId}")
	public ResponseEntity<?> diaryDetails(@PathVariable("diaryId") Long diaryId) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryDetailDto response = diaryService.detailDiary(userId, diaryId);

		return new ResponseEntity<>(ResponseDto.success(DIARY_DETAILS_OK, response), HttpStatus.OK);
	}

	@GetMapping("/list")
	public ResponseEntity<?> diaryMyList(@ModelAttribute DiaryListReq diaryListReq, @PageableDefault(size = 10) Pageable pageable) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryListRes response = diaryService.findMyDiaries(userId, diaryListReq, pageable);

		return new ResponseEntity<>(ResponseDto.success(MY_DIARIES_OK, response), HttpStatus.OK);
	}

	@GetMapping("/list/{userId}")
	public ResponseEntity<?> diaryList(@ModelAttribute DiaryListReq diaryListReq, @PageableDefault(size = 10) Pageable pageable, @PathVariable("userId") String friendUuid) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryListRes response = diaryService.findDiaries(userId, friendUuid, diaryListReq, pageable);

		return new ResponseEntity<>(ResponseDto.success(OTHER_DIARIES_OK, response), HttpStatus.OK);
	}

	@GetMapping("monthly")
	public ResponseEntity<?> diaryMyMonthlyList(@ModelAttribute DiaryMonthlyListReq diaryMonthlyListReq) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryMonthlyListRes response = diaryService.findMyMonthlyDiaries(userId, diaryMonthlyListReq);

		return new ResponseEntity<>(ResponseDto.success(MY_MONTHLY_DIARIES_OK, response), HttpStatus.OK);
	}

	@GetMapping("monthly/{userId}")
	public ResponseEntity<?> diaryMonthlyList(@ModelAttribute DiaryMonthlyListReq diaryMonthlyListReq, @PathVariable("userId") String userUuid) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryMonthlyListRes response = diaryService.findMonthlyDiaries(userId, userUuid, diaryMonthlyListReq);

		return new ResponseEntity<>(ResponseDto.success(OTHER_MONTHLY_DIARIES_OK, response), HttpStatus.OK);
	}


	@PostMapping("/{diaryId}")
	public ResponseEntity<?> diaryModify(@PathVariable("diaryId") Long diaryId,
										 @RequestPart(value = "dto") DiaryModifyReq diaryModifyReq,
										 @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		diaryService.modifyDiary(userId, diaryId, diaryModifyReq, file);

		return new ResponseEntity<>(ResponseDto.success(DIARY_MODIFIED, null), HttpStatus.OK);
	}

	@DeleteMapping("/{diaryId}")
	public ResponseEntity<?> diaryRemove(@PathVariable("diaryId") Long diaryId) {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		diaryService.removeDiary(userId, diaryId);

		return new ResponseEntity<>(ResponseDto.success(DIARY_DELETED, null), HttpStatus.OK);
	}

	@GetMapping("/resources")
	public ResponseEntity<?> diaryResourceList() {
		ResourceListRes response = diaryService.findDiaryResources();

		return new ResponseEntity<>(ResponseDto.success(DIARY_RESOURCES_OK, response), HttpStatus.OK);
	}

	@GetMapping("/stamps")
	public ResponseEntity<?> diaryStampList() {
		StampListRes response = diaryService.findDiaryStamps();

		return new ResponseEntity<>(ResponseDto.success(DIARY_STAMP_OK, response), HttpStatus.OK);
	}
}