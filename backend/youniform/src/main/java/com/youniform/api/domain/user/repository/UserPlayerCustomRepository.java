package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.player.entity.Player;

import java.util.List;

public interface UserPlayerCustomRepository {
	List<Player> findPlayerByUserId(Long userId);
}
