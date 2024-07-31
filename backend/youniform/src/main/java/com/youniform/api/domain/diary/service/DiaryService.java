package com.youniform.api.domain.diary.service;

import com.youniform.api.domain.diary.dto.DiaryAddReq;
import com.youniform.api.domain.diary.dto.DiaryAddRes;

public interface DiaryService {
	DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq);
}
