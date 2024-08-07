package com.youniform.api.domain.photocard.repository;

import com.youniform.api.domain.photocard.entity.Photocard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotocardRepository extends JpaRepository<Photocard, Long> {
	List<Photocard> findByUserId(Long userId);
}
