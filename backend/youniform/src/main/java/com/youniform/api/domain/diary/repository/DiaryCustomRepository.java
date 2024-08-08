package com.youniform.api.domain.diary.repository;

import com.youniform.api.domain.diary.entity.Diary;
import com.youniform.api.domain.friend.entity.Status;

import java.time.LocalDate;
import java.util.List;

public interface DiaryCustomRepository  {
	List<Diary> findByUserIdAndCursor(Long userId, Status status, LocalDate lastDiaryDate, int pageSize, boolean isAscending, boolean isUser);

	List<Diary> findByUserIdAndDate(Long userId, Status status, LocalDate calendarDate, boolean isUser);
}
