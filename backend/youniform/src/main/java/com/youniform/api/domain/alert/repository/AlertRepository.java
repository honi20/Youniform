package com.youniform.api.domain.alert.repository;

import com.youniform.api.domain.alert.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
	List<Alert> findByReceiverIdAndIsDeletedFalse(@Param("userId") Long userId);
}