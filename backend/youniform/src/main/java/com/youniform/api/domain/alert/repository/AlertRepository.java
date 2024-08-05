package com.youniform.api.domain.alert.repository;

import com.youniform.api.domain.alert.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {
}
