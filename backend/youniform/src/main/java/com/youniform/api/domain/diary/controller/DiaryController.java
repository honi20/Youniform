package com.youniform.api.domain.diary.controller;

import com.youniform.api.domain.diary.dto.*;
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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

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
	public ResponseDto<?> diaryDetails(@PathVariable Long diaryId) {
		DiaryDetailsRes response = new DiaryDetailsRes();
		return ResponseDto.success(SuccessCode.DIARY_DETAILS_OK, response);
	}

	@PutMapping("/{diaryId}")
	public ResponseDto<?> diaryModify(@PathVariable Long diaryId) {
		return ResponseDto.success(SuccessCode.DIARY_MODIFIED, null);
	}

	@DeleteMapping("/{diaryId}")
	public ResponseDto<?> diaryRemove(@PathVariable Long diaryId) {
		return ResponseDto.success(SuccessCode.DIARY_DELETED, null);
	}

	@GetMapping
	public ResponseDto<?> diaryList() {
		List<DiaryListRes> response = new ArrayList<>();
		return ResponseDto.success(SuccessCode.MY_DIARIES_OK, response);
	}

	@GetMapping("/{userId}")
	public ResponseDto<?> diaryListByUserId(@PathVariable Long userId) {
		List<DiaryListRes> response = new ArrayList<>();
		return ResponseDto.success(SuccessCode.OTHER_DIARIES_OK, response);
	}

	private void validateDiaryAddReq(DiaryAddReq diaryAddReq) {
		try {
			LocalDate.parse(diaryAddReq.getDiaryDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		} catch (DateTimeParseException e) {
			throw new CustomException(ErrorCode.INVALID_DIARY_DATE);
		}

		DiaryContentDto contents = diaryAddReq.getContents();
		if (contents.getVersion() == null || contents.getVersion().equals("")) {
			throw new CustomException(ErrorCode.INVALID_DIARY_CONTENTS);
		} else if (contents.getBackground() == null || contents.getBackground().equals("")) {
			throw new CustomException(ErrorCode.INVALID_DIARY_CONTENTS);
		} else if (contents.getBackgroundImage().getType() == null
				|| !contents.getBackgroundImage().getType().equals("image")) {
			throw new CustomException(ErrorCode.INVALID_DIARY_CONTENTS);
		} else {
			for (DiaryContentObjectDto dto : contents.getObjects()) {
				if (dto.getType() == null
						|| (!dto.getType().equals("image") && !dto.getType().equals("textbox"))) {
					throw new CustomException(ErrorCode.INVALID_DIARY_CONTENTS);
				}
			}
		}

		if (!diaryAddReq.getScope().equals("ALL") && !diaryAddReq.getScope().equals("FRIENDS") && !diaryAddReq.getScope().equals("PRIVATE")) {
			throw new CustomException(ErrorCode.INVALID_DIARY_SCOPE);
		}

		if (diaryAddReq.getStampId() < 0) {
			throw new CustomException(ErrorCode.STAMP_NOT_FOUND);
		}
	}
}