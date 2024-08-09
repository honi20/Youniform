
package com.youniform.api.domain.user.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.user.dto.SearchUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youniform.api.domain.user.entity.QUsers.users;

@Repository
@RequiredArgsConstructor
public class UserCustomRepositoryImpl implements UserCustomRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public Slice<SearchUserDto> findUserByCursor(Long userId, Long lastUserId, Pageable pageable) {
		List<SearchUserDto> userList = queryFactory.select(Projections.constructor(SearchUserDto.class,
				users.uuid.as("userId"),
				users.profileUrl.as("imgUrl"),
				users.nickname.as("nickname"),
				users.introduce.as("introduce"),
				users.team.imgUrl.as("teamUrl")
				))
				.from(users)
				.where(conditionUserId(lastUserId))
				.orderBy(users.id.desc())
				.limit(pageable.getPageSize() + 1)
				.fetch();

		boolean hasNext = false;
		if (userList.size() > pageable.getPageSize()) {
			userList.remove(pageable.getPageSize());
			hasNext = true;
		}

		return new SliceImpl<>(userList, pageable, hasNext);
	}

	private BooleanExpression conditionUserId(Long lastUserId) {
		return lastUserId == null ? null : users.id.lt(lastUserId);
	}
}