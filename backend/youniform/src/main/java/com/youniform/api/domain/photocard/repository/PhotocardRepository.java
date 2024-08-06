package com.youniform.api.domain.photocard.repository;

import com.youniform.api.domain.photocard.entity.Photocard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotocardRepository extends JpaRepository<Photocard, Long> {
}
