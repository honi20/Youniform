
package com.youniform.api.domain.user.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.friend.entity.Status;
import com.youniform.api.domain.user.dto.MyDetailsRes;
import com.youniform.api.domain.user.dto.SearchUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youniform.api.domain.like_post.entity.QLikePost.likePost;
import static com.youniform.api.domain.user.entity.QUsers.users;
import static com.youniform.api.domain.friend.entity.QFriend.friend1;

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
				.where(users.id.eq(userId).not())
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

	@Override
	public MyDetailsRes findUserDetailsWithCounts(Long userId) {
		return queryFactory.select(Projections.constructor(
						MyDetailsRes.class,
						users.nickname,
						users.introduce,
						users.profileUrl,
						users.theme,
						users.pushAlert,
						users.playPushAlert,
						users.team.imgUrl,
						likePost.likePostPK.postId.countDistinct(),
						friend1.friendPK.friendId.countDistinct(),
						users.providerType
				))
				.from(users)
				.leftJoin(likePost).on(users.id.eq(likePost.user.id))
				.leftJoin(friend1).on(users.id.eq(friend1.user.id).and(friend1.status.eq(Status.FRIEND)))
				.where(users.id.eq(userId))
				.groupBy(users)
				.fetchOne();
	}

	private BooleanExpression conditionUserId(Long lastUserId) {
		return lastUserId == null ? null : users.id.lt(lastUserId);
	}
}