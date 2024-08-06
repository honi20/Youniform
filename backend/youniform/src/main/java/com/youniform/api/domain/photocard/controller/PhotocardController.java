package com.youniform.api.domain.photocard.controller;

import com.youniform.api.domain.photocard.dto.PhotocardAddReq;
import com.youniform.api.domain.photocard.dto.PhotocardAddRes;
import com.youniform.api.domain.photocard.dto.PhotocardDetailsRes;
import com.youniform.api.domain.photocard.dto.PhotocardListRes;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.statuscode.ErrorCode;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.domain.photocard.util.PhotocardControllerUtil.*;

@RestController
@RequestMapping("photocards")
@RequiredArgsConstructor
@Validated
public class PhotocardController {
	@PostMapping
	public ResponseEntity<?> photocardAdd(@RequestBody PhotocardAddReq photocardAddReq) {
		PhotocardAddRes response = new PhotocardAddRes(1L);
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.PHOTOCARD_CREATED, response), HttpStatus.CREATED);
	}

	@GetMapping("/{photocardId}")
	public ResponseEntity<?> photocardDetails(@PathVariable Long photocardId) throws Exception {
		if (photocardId == null || photocardId < 0) {
			throw new CustomException(ErrorCode.PHOTOCARD_NOT_FOUND);
		}

		PhotocardDetailsRes response = getPhotocardDetailsRes();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.PHOTOCARD_DETAILS_OK, response), HttpStatus.OK);
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
		PhotocardListRes response = getPhotocardListRes();
		return new ResponseEntity<>(ResponseDto.success(SuccessCode.PHOTOCARD_LIST_OK, response), HttpStatus.OK);
	}
}
