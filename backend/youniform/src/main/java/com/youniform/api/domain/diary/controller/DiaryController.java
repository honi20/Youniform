package com.youniform.api.domain.diary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.*;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.statuscode.ErrorCode;
import com.youniform.api.global.statuscode.SuccessCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.domain.diary.util.DiaryControllerUtil.*;

@RestController
@RequestMapping("/diaries")
@RequiredArgsConstructor
@Validated
public class DiaryController {
	@PostMapping
	public ResponseEntity<?> diaryAdd(@RequestBody @Valid DiaryAddReq diaryAddReq) {
		validateDiaryAddReq(diaryAddReq);
		DiaryAddRes response = new DiaryAddRes(1L);
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.DIARY_CREATED, response), HttpStatus.CREATED);
	}

	@GetMapping("/{diaryId}")
	public ResponseEntity<?> diaryDetails(@PathVariable Long diaryId) throws JsonProcessingException {
		if (diaryId == null || diaryId < 0) {
			throw new CustomException(ErrorCode.DIARY_NOT_FOUND);
		}

		DiaryDetailsRes response = getDiaryDetailsExample();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.DIARY_DETAILS_OK, response), HttpStatus.OK);
	}

	@PutMapping("/{diaryId}")
	public ResponseEntity<?> diaryModify(@PathVariable Long diaryId, @RequestBody @Valid DiaryModifyReq diaryModifyReq) {
		if (diaryId == null || diaryId < 0) {
			throw new CustomException(ErrorCode.DIARY_NOT_FOUND);
		}

		return new ResponseEntity<>(ResponseDto.success(SuccessCode.DIARY_MODIFIED, null), HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/{diaryId}")
	public ResponseEntity<?> diaryRemove(@PathVariable Long diaryId) {
		if (diaryId == null || diaryId < 0) {
			throw new CustomException(ErrorCode.DIARY_NOT_FOUND);
		}

		return new ResponseEntity<>(ResponseDto.success(SuccessCode.DIARY_DELETED, null), HttpStatus.NO_CONTENT);
	}

	@GetMapping("/list")
	public ResponseEntity<?> diaryMyList() throws JsonProcessingException {
		DiaryListRes response = getDiaryListRes();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.MY_DIARIES_OK, response), HttpStatus.OK);
	}

	@GetMapping("/list/{userUuid}")
	public ResponseEntity<?> diaryList(@PathVariable String userUuid) throws JsonProcessingException {
		if (userUuid.equals("noUser")) {
			throw new CustomException(ErrorCode.WRITER_NOT_FOUND);
		}

		DiaryListRes response = getDiaryListRes();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.OTHER_DIARIES_OK, response), HttpStatus.OK);
	}

	@GetMapping("/resources")
	public ResponseEntity<?> diaryResourcesList() {
		ResourceListRes response = getDiaryResourceRes();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.DIARY_RESOURCES_OK, response), HttpStatus.OK);
	}
}