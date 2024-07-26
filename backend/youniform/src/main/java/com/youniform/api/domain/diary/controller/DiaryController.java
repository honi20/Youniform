package com.youniform.api.domain.diary.controller;

import com.youniform.api.domain.diary.dto.add.DiaryAddReq;
import com.youniform.api.domain.diary.dto.add.DiaryAddRes;
import com.youniform.api.domain.diary.dto.details.DiaryDetailsRes;
import com.youniform.api.domain.diary.dto.list.DiaryListRes;
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
        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.success(SuccessCode.CREATED, response));
    }

    @GetMapping("/{diaryId}")
    public ResponseDto<?> diaryDetails(@PathVariable Long diaryId) {
        DiaryDetailsRes response = new DiaryDetailsRes();
        return ResponseDto.success(SuccessCode.SUCCESS, response);
    }

    @PutMapping("/{diaryId}")
    public ResponseDto<?> diaryModify(@PathVariable Long diaryId) {
        return ResponseDto.success(SuccessCode.UPDATED, null);
    }

    @DeleteMapping("/{diaryId}")
    public ResponseDto<?> diaryRemove(@PathVariable Long diaryId) {
        return ResponseDto.success(SuccessCode.DELETED, null);
    }

    @GetMapping
    public ResponseDto<?> diaryList() {
        List<DiaryListRes> response = new ArrayList<>();
        return ResponseDto.success(SuccessCode.SUCCESS, response);
    }

    @GetMapping("/{userId}")
    public ResponseDto<?> diaryListByUserId(@PathVariable Long userId) {
        List<DiaryListRes> response = new ArrayList<>();
        return ResponseDto.success(SuccessCode.SUCCESS, response);
    }
}