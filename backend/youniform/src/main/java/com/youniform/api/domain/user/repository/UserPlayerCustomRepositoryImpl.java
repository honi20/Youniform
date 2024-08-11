package com.youniform.api.domain.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.player.entity.Player;
import com.youniform.api.domain.user.entity.QUsers;
import com.youniform.api.domain.user.entity.UserPlayer;
import com.youniform.api.domain.user.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youniform.api.domain.player.entity.QPlayer.player;
import static com.youniform.api.domain.user.entity.QUserPlayer.userPlayer;
import static com.youniform.api.domain.user.entity.QUsers.users;

@Repository
@RequiredArgsConstructor
public class UserPlayerCustomRepositoryImpl implements UserPlayerCustomRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public List<UserPlayer> findPlayerByUserId(Long userId) {
		return queryFactory.selectFrom(userPlayer)
				.join(userPlayer.player, player)
				.where(userPlayer.user.id.eq(userId))
				.fetch();
	}

	@Override
	public List<Users> findUserByPlayerId(Long playerId) {
		return queryFactory.select(users)
				.from(userPlayer)
				.join(userPlayer.user, users)
				.where(userPlayer.player.id.eq(playerId))
				.fetch();
	}
}
