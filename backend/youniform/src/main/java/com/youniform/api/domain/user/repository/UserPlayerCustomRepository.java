package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.player.entity.Player;
import com.youniform.api.domain.user.entity.UserPlayer;
import com.youniform.api.domain.user.entity.Users;

import java.util.List;

public interface UserPlayerCustomRepository {
	List<UserPlayer> findPlayerByUserId(Long userId);

	List<Users> findUserByPlayerId(Long playerId);
}
