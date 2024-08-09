
package com.youniform.api.domain.post.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.post.dto.PostDto;
import com.youniform.api.domain.post.dto.PostListDto;
import com.youniform.api.domain.tag.dto.TagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youniform.api.domain.comment.entity.QComment.comment;
import static com.youniform.api.domain.like_post.entity.QLikePost.likePost;
import static com.youniform.api.domain.post.entity.QPost.post;
import static com.youniform.api.domain.post_tag.entity.QPostTag.postTag;
import static com.youniform.api.domain.tag.entity.QTag.tag;

@Repository
@RequiredArgsConstructor
public class PostCustomRepositoryImpl implements PostCustomRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public Slice<PostDto> findPostByCursor(Long userId, Long lastPostId, Pageable pageable) {
		List<PostListDto> postList = queryFactory.select(Projections.constructor(PostListDto.class,
						post.id.as("postId"),
						post.user.profileUrl.as("profileImg"),
						post.user.nickname.as("nickname"),
						post.imgUrl.as("imageUrl"),
						post.contents.as("contents"),
						post.date.as("createdAt"),
						comment.countDistinct().as("commentCount"),
						post.user.uuid.as("userId"),
						likePost.likePostPK.isNotNull()
				))
				.from(post)
				.leftJoin(comment).on(post.id.eq(comment.post.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id))
				.leftJoin(postTag).on(post.id.eq(postTag.post.id))
				.leftJoin(tag).on(postTag.tag.id.eq(tag.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id).and(likePost.user.id.eq(userId)))
				.where(conditionPostId(lastPostId))
				.groupBy(post.id)
				.orderBy(post.id.desc())
				.limit(pageable.getPageSize() + 1)
				.fetch();

		List<PostDto> posts = postList.stream()
				.map(p -> {
					List<TagDto> tags = findTagsByPostId(p.getPostId());
					return PostDto.toDto(p, tags);
				}).toList();

		boolean hasNext = false;
		if (posts.size() > pageable.getPageSize()) {
			posts.remove(pageable.getPageSize());
			hasNext = true;
		}

		return new SliceImpl<>(posts, pageable, hasNext);
	}

	@Override
	public Slice<PostDto> findMyPostByCursor(Long userId, Long lastPostId, Pageable pageable) {
		List<PostListDto> postList = queryFactory.select(Projections.constructor(PostListDto.class,
						post.id.as("postId"),
						post.user.profileUrl.as("profileImg"),
						post.user.nickname.as("nickname"),
						post.imgUrl.as("imageUrl"),
						post.contents.as("contents"),
						post.date.as("createdAt"),
						comment.countDistinct().as("commentCount"),
						post.user.uuid.as("userId"),
						likePost.likePostPK.isNotNull()
				))
				.from(post)
				.leftJoin(comment).on(post.id.eq(comment.post.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id))
				.leftJoin(postTag).on(post.id.eq(postTag.post.id))
				.leftJoin(tag).on(postTag.tag.id.eq(tag.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id).and(likePost.user.id.eq(userId)))
				.where(post.user.id.eq(userId))
				.where(conditionPostId(lastPostId))
				.groupBy(post.id)
				.orderBy(post.id.desc())
				.limit(pageable.getPageSize() + 1)
				.fetch();

		List<PostDto> posts = postList.stream()
				.map(p -> {
					List<TagDto> tags = findTagsByPostId(p.getPostId());
					return PostDto.toDto(p, tags);
				}).toList();

		boolean hasNext = false;
		if (posts.size() > pageable.getPageSize()) {
			posts.remove(pageable.getPageSize());
			hasNext = true;
		}

		return new SliceImpl<>(posts, pageable, hasNext);
	}

	@Override
	public Slice<PostDto> findFriendPostByCursor(Long userId, String friendId, Long lastPostId, Pageable pageable) {
		List<PostListDto> postList = queryFactory.select(Projections.constructor(PostListDto.class,
						post.id.as("postId"),
						post.user.profileUrl.as("profileImg"),
						post.user.nickname.as("nickname"),
						post.imgUrl.as("imageUrl"),
						post.contents.as("contents"),
						post.date.as("createdAt"),
						comment.countDistinct().as("commentCount"),
						post.user.uuid.as("userId"),
						likePost.likePostPK.isNotNull()
				))
				.from(post)
				.leftJoin(comment).on(post.id.eq(comment.post.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id))
				.leftJoin(postTag).on(post.id.eq(postTag.post.id))
				.leftJoin(tag).on(postTag.tag.id.eq(tag.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id).and(likePost.user.id.eq(userId)))
				.where(post.user.uuid.eq(friendId))
				.where(conditionPostId(lastPostId))
				.groupBy(post.id)
				.orderBy(post.id.desc())
				.limit(pageable.getPageSize() + 1)
				.fetch();

		List<PostDto> posts = postList.stream()
				.map(p -> {
					List<TagDto> tags = findTagsByPostId(p.getPostId());
					return PostDto.toDto(p, tags);
				}).toList();

		boolean hasNext = false;
		if (posts.size() > pageable.getPageSize()) {
			posts.remove(pageable.getPageSize());
			hasNext = true;
		}

		return new SliceImpl<>(posts, pageable, hasNext);
	}

	@Override
	public Slice<PostDto> findLikedPostByCursor(Long userId, Long lastPostId, Pageable pageable) {
		List<PostListDto> postList = queryFactory.select(Projections.constructor(PostListDto.class,
						post.id.as("postId"),
						post.user.profileUrl.as("profileImg"),
						post.user.nickname.as("nickname"),
						post.imgUrl.as("imageUrl"),
						post.contents.as("contents"),
						post.date.as("createdAt"),
						comment.countDistinct().as("commentCount"),
						post.user.uuid.as("userId"),
						likePost.likePostPK.isNotNull()
				))
				.from(post)
				.leftJoin(comment).on(post.id.eq(comment.post.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id))
				.leftJoin(postTag).on(post.id.eq(postTag.post.id))
				.leftJoin(tag).on(postTag.tag.id.eq(tag.id))
				.where(likePost.user.id.eq(userId))
				.where(conditionPostId(lastPostId))
				.groupBy(post.id)
				.orderBy(post.id.desc())
				.limit(pageable.getPageSize() + 1)
				.fetch();

		List<PostDto> posts = postList.stream()
				.map(p -> {
					List<TagDto> tags = findTagsByPostId(p.getPostId());
					return PostDto.toDto(p, tags);
				}).toList();

		boolean hasNext = false;
		if (posts.size() > pageable.getPageSize()) {
			posts.remove(pageable.getPageSize());
			hasNext = true;
		}

		return new SliceImpl<>(posts, pageable, hasNext);
	}

	@Override
	public Slice<PostDto> findTagPostByCursor(Long userId, Long tagId, Long lastPostId, Pageable pageable) {
		List<PostListDto> postList = queryFactory.select(Projections.constructor(PostListDto.class,
						post.id.as("postId"),
						post.user.profileUrl.as("profileImg"),
						post.user.nickname.as("nickname"),
						post.imgUrl.as("imageUrl"),
						post.contents.as("contents"),
						post.date.as("createdAt"),
						comment.countDistinct().as("commentCount"),
						post.user.uuid.as("userId"),
						likePost.likePostPK.isNotNull()
				))
				.from(post)
				.leftJoin(comment).on(post.id.eq(comment.post.id))
				.leftJoin(likePost).on(post.id.eq(likePost.post.id).and(likePost.user.id.eq(userId)))
				.leftJoin(postTag).on(post.id.eq(postTag.post.id))
				.leftJoin(tag).on(postTag.tag.id.eq(tag.id))
				.where(tag.id.eq(tagId))
				.where(conditionPostId(lastPostId))
				.groupBy(post.id)
				.orderBy(post.id.desc())
				.limit(pageable.getPageSize() + 1)
				.fetch();

		List<PostDto> posts = postList.stream()
				.map(p -> {
					List<TagDto> tags = findTagsByPostId(p.getPostId());
					return PostDto.toDto(p, tags);
				}).toList();

		boolean hasNext = false;
		if (posts.size() > pageable.getPageSize()) {
			posts.remove(pageable.getPageSize());
			hasNext = true;
		}

		return new SliceImpl<>(posts, pageable, hasNext);
	}

	private List<TagDto> findTagsByPostId(Long postId) {
		return queryFactory.select(Projections.constructor(TagDto.class,
						tag.id.as("tagId"),
						tag.contents.as("contents")))
				.from(tag)
				.join(postTag).on(tag.id.eq(postTag.tag.id))
				.where(postTag.post.id.eq(postId))
				.fetch();
	}

	private BooleanExpression conditionPostId(Long lastPostId) {
		return lastPostId == null ? null : post.id.lt(lastPostId);
	}
}