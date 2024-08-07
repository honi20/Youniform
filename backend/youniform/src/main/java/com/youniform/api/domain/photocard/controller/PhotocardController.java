package com.youniform.api.domain.photocard.controller;

import com.youniform.api.domain.photocard.dto.PhotocardAddReq;
import com.youniform.api.domain.photocard.dto.PhotocardAddRes;
import com.youniform.api.domain.photocard.service.PhotocardService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.statuscode.ErrorCode;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("photocards")
@RequiredArgsConstructor
@Validated
public class PhotocardController {
	private final JwtService jwtService;

	private final PhotocardService photocardService;

	@PostMapping
	public ResponseEntity<?> photocardAdd(@RequestBody PhotocardAddReq photocardAddReq) {
//		Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

		PhotocardAddRes response = photocardService.addPhotocard(123L, photocardAddReq);

		return new ResponseEntity<>(ResponseDto.success(SuccessCode.PHOTOCARD_CREATED, response), HttpStatus.CREATED);
	}

	@GetMapping("/{photocardId}")
	public ResponseEntity<?> photocardDetails(@PathVariable Long photocardId) throws Exception {
		if (photocardId == null || photocardId < 0) {
			throw new CustomException(ErrorCode.PHOTOCARD_NOT_FOUND);
		}

//		PhotocardDetailsRes response = getPhotocardDetailsRes();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.PHOTOCARD_DETAILS_OK, null), HttpStatus.OK);
	}

	@DeleteMapping("/{photocardId}")
	public ResponseEntity<?> photocardRemove(@PathVariable Long photocardId) throws Exception {
		if (photocardId == null || photocardId < 0) {
			throw new CustomException(ErrorCode.PHOTOCARD_NOT_FOUND);
		}

		return new ResponseEntity<>(ResponseDto.success(SuccessCode.PHOTOCARD_DELETED, null), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<?> photocardList() throws Exception {
//		PhotocardListRes response = getPhotocardListRes();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.PHOTOCARD_LIST_OK, null), HttpStatus.OK);
	}
}
