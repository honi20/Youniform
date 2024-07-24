package com.youniform.api.domain.diary.controller;

import com.youniform.api.domain.diary.dto.DiaryAddReq;
import com.youniform.api.domain.diary.dto.DiaryAddRes;
import com.youniform.api.domain.diary.dto.DiaryDetailsRes;
import com.youniform.api.domain.diary.dto.DiaryListRes;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.SuccessCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {
    @PostMapping
    public ResponseDto<?> diaryAdd(@RequestBody @Valid DiaryAddReq diaryAddReq,
                                   @RequestPart List<MultipartFile> imageFiles) {
        DiaryAddRes response = new DiaryAddRes();
        return ResponseDto.success(SuccessCode.CREATED, response);
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