package com.youniform.api.domain.diary.repository;

import com.youniform.api.domain.diary.entity.DiaryResource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<DiaryResource, Long> {
}
