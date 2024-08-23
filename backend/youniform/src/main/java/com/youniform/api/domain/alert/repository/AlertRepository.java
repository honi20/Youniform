package com.youniform.api.domain.alert.repository;

import com.youniform.api.domain.alert.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlertRepository extends JpaRepository<Alert, Long> {
	Optional<Alert> findByIdAndReceiverId(Long alertId, Long userId);

	@Query("select a from Alert a where a.receiver.id = :userId order by a.createdAt desc")
	List<Alert> findByReceiverId(@Param("userId") Long userId);
}