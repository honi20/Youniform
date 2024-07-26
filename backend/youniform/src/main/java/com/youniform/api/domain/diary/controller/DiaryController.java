package com.youniform.api.domain.diary.controller;

import com.youniform.api.domain.diary.dto.DiaryAddReq;
import com.youniform.api.domain.diary.dto.DiaryAddRes;
import com.youniform.api.domain.diary.dto.DiaryDetailsRes;
import com.youniform.api.domain.diary.dto.DiaryListRes;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.SuccessCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/diaries")
@RequiredArgsConstructor
public class DiaryController {
    @PostMapping
    public ResponseEntity<?> diaryAdd(@RequestBody @Valid DiaryAddReq diaryAddReq) {
        DiaryAddRes response = new DiaryAddRes(1L);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.success(SuccessCode.DIARY_CREATED, response));
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
}