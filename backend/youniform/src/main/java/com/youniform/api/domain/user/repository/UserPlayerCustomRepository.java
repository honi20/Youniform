package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.player.entity.Player;
import com.youniform.api.domain.user.entity.Users;

import java.util.List;

public interface UserPlayerCustomRepository {
	List<Player> findPlayerByUserId(Long userId);

	List<Users> findUserByPlayerId(Long playerId);
}
