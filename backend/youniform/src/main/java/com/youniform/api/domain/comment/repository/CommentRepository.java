package com.youniform.api.domain.comment.repository;

import com.youniform.api.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c " +
            "JOIN FETCH c.post " +
            "WHERE c.post.id = :postId")
    List<Comment> findCommentsByPostId(@Param("postId") Long postId);
}
