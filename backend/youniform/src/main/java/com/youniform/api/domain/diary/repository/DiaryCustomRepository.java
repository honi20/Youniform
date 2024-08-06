package com.youniform.api.domain.diary.repository;

import com.youniform.api.domain.diary.entity.Diary;

import java.time.LocalDate;
import java.util.List;

public interface DiaryCustomRepository  {
	List<Diary> findByUserIdAndCursor(Long userId, LocalDate lastDiaryDate, int pageSize, boolean isAscending);

	List<Diary> findByUserIdAndDate(Long userId, LocalDate calendarDate);
}
