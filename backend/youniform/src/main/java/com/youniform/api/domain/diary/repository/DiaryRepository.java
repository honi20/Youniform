package com.youniform.api.domain.diary.repository;

import com.youniform.api.domain.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
	List<Diary> findByUserId(Long userId);
}
