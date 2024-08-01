package com.youniform.api.domain.diary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.*;
import com.youniform.api.domain.diary.service.DiaryService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.domain.diary.util.DiaryControllerUtil.*;
import static com.youniform.api.global.statuscode.ErrorCode.DIARY_NOT_FOUND;
import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequestMapping("/diaries")
@RequiredArgsConstructor
@Validated
public class DiaryController {
	private final DiaryService diaryService;

	private final JwtService jwtService;

	@PostMapping
	public ResponseEntity<?> diaryAdd(@RequestBody @Valid DiaryAddReq diaryAddReq) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryAddRes response = diaryService.addDiary(userId, diaryAddReq);

		return new ResponseEntity<>(ResponseDto.success(DIARY_CREATED, response), HttpStatus.CREATED);
	}

	@GetMapping("/{diaryId}")
	public ResponseEntity<?> diaryDetails(@PathVariable Long diaryId) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryDetailDto response = diaryService.detailDiary(userId, diaryId);

		return new ResponseEntity<>(ResponseDto.success(DIARY_DETAILS_OK, response), HttpStatus.OK);
	}

	@PutMapping("/{diaryId}")
	public ResponseEntity<?> diaryModify(@PathVariable Long diaryId, @RequestBody @Valid DiaryModifyReq diaryModifyReq) {
		if (diaryId == null || diaryId < 0) {
			throw new CustomException(DIARY_NOT_FOUND);
		}

		return new ResponseEntity<>(ResponseDto.success(DIARY_MODIFIED, null), HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/{diaryId}")
	public ResponseEntity<?> diaryRemove(@PathVariable Long diaryId) {
		if (diaryId == null || diaryId < 0) {
			throw new CustomException(DIARY_NOT_FOUND);
		}

		return new ResponseEntity<>(ResponseDto.success(DIARY_DELETED, null), HttpStatus.NO_CONTENT);
	}

	@GetMapping("/list")
	public ResponseEntity<?> diaryMyList(@ModelAttribute DiaryListReq diaryListReq, @PageableDefault(size = 10) Pageable pageable) throws JsonProcessingException {
		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		DiaryListRes response = diaryService.listMyDiary(userId, diaryListReq, pageable);

		return new ResponseEntity<>(ResponseDto.success(MY_DIARIES_OK, response), HttpStatus.OK);
	}

	@GetMapping("/list/{userUuid}")
	public ResponseEntity<?> diaryList(@ModelAttribute DiaryListReq diaryListReq, @PageableDefault(size = 10) Pageable pageable, @PathVariable String userUuid) throws JsonProcessingException {
		DiaryListRes response = diaryService.listDiary(userUuid, diaryListReq, pageable);

		return new ResponseEntity<>(ResponseDto.success(OTHER_DIARIES_OK, response), HttpStatus.OK);
	}

	@GetMapping("/resources")
	public ResponseEntity<?> diaryResourcesList() {
		ResourceListRes response = getDiaryResourceRes();
		return new ResponseEntity<>(ResponseDto.success(DIARY_RESOURCES_OK, response), HttpStatus.OK);
	}
}