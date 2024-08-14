package com.youniform.api.domain.like_post.repository;

import com.youniform.api.domain.like_post.entity.LikePost;
import com.youniform.api.domain.like_post.entity.LikePostPK;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LikePostRepository extends JpaRepository<LikePost, LikePostPK> {
    @Query("SELECT CASE WHEN (COUNT(lp) > 0) THEN TRUE ELSE FALSE END " +
            "FROM LikePost lp " +
            "WHERE lp.post.id = :postId")
    Boolean isLikedPost(@Param("postId") Long postId);

    @Modifying
    @Transactional
    @Query("DELETE FROM LikePost lp " +
            "WHERE lp.post.id = :postId")
    void deleteAllByPostId(@Param("postId") Long postId);
}
