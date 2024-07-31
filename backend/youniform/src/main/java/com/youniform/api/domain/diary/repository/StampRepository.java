package com.youniform.api.domain.diary.repository;

import com.youniform.api.domain.diary.entity.DiaryStamp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StampRepository extends JpaRepository<DiaryStamp, Long> {
}
