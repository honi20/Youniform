package com.youniform.api.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youniform.api.domain.diary.dto.*;
import com.youniform.api.domain.diary.dto.resource.ResourceListRes;
import com.youniform.api.domain.diary.dto.resource.StampListRes;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DiaryService {
	DiaryAddRes addDiary(Long userId, DiaryAddReq diaryAddReq, MultipartFile file) throws IOException;

	DiaryDetailDto detailDiary(Long userId, Long diaryId) throws IOException;

	DiaryListRes findMyDiaries(Long userId, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException;

	DiaryListRes findDiaries(Long userId, String friendUuid, DiaryListReq diaryListReq, Pageable pageable) throws JsonProcessingException;

	DiaryMonthlyListRes findMyMonthlyDiaries(Long userId, DiaryMonthlyListReq diaryMonthlyListReq) throws JsonProcessingException;

	DiaryMonthlyListRes findMonthlyDiaries(Long userId, String friendUuid, DiaryMonthlyListReq diaryMonthlyListReq) throws JsonProcessingException;

	void modifyDiary(Long userId, Long diaryId, DiaryModifyReq diaryModifyReq, MultipartFile file) throws IOException;

	void removeDiary(Long userId, Long diaryId);

	ResourceListRes findDiaryResources();

	StampListRes findDiaryStamps();
}
