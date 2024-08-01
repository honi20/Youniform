package com.youniform.api.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.global.dto.SliceDto;
import org.springframework.data.domain.Pageable;

public interface DiaryService {
	DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq) throws JsonProcessingException;

	DiaryDetailDto detailDiary(Long userId, Long diaryId) throws JsonProcessingException;

	DiaryListRes listMyDiary(Long userId, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException;

	DiaryListRes listDiary(String userUuid, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException;
}
