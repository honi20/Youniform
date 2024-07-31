package com.youniform.api.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.diary.dto.DiaryAddReq;
import com.youniform.api.domain.diary.dto.DiaryAddRes;
import com.youniform.api.domain.diary.dto.DiaryDetailDto;

public interface DiaryService {
	DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq) throws JsonProcessingException;

	DiaryDetailDto detailDiary(Long userId, Long diaryId) throws JsonProcessingException;
}
