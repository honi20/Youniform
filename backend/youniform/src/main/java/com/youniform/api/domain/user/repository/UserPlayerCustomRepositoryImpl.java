package com.youniform.api.domain.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.player.entity.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youniform.api.domain.player.entity.QPlayer.player;
import static com.youniform.api.domain.user.entity.QUserPlayer.userPlayer;

@Repository
@RequiredArgsConstructor
public class UserPlayerCustomRepositoryImpl implements UserPlayerCustomRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public List<Player> findPlayerByUserId(Long userId) {
		return queryFactory.select(player)
				.from(userPlayer)
				.join(userPlayer.player, player)
				.where(userPlayer.user.id.eq(userId))
				.fetch();
	}
}
