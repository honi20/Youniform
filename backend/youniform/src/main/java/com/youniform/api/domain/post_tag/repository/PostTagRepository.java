package com.youniform.api.domain.post_tag.repository;

import com.youniform.api.domain.post_tag.entity.PostTag;
import com.youniform.api.domain.post_tag.entity.PostTagPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PostTagRepository extends JpaRepository<PostTag, PostTagPK> {
    @Modifying
    @Transactional
    @Query("DELETE FROM PostTag pt " +
            "WHERE pt.postTagPK.postId =: id")
    void deletePostTagsByPostId(@Param("id") Long postId);
}
