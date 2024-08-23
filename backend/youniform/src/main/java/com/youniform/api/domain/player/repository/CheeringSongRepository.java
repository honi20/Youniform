package com.youniform.api.domain.player.repository;

import com.youniform.api.domain.player.entity.CheeringSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheeringSongRepository extends JpaRepository<CheeringSong, Long> {
	List<CheeringSong> findByPlayerId(Long playerId);
}
