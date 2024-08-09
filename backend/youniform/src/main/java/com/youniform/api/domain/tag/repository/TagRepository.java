package com.youniform.api.domain.tag.repository;

import com.youniform.api.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("SELECT t FROM Tag t " +
            "WHERE t.contents IN :tags")
    List<Tag> findByContentsIn(@Param("tags") List<String> tags);

    @Query("SELECT t FROM Tag t " +
            "JOIN PostTag pt ON t.id = pt.tag.id " +
            "WHERE pt.post.id = :postId")
    List<Tag> findTagsByPostId(@Param("postId") Long postId);

    @Query("SELECT t FROM Tag t " +
            "WHERE t.contents LIKE :contents% " +
            "ORDER BY CASE WHEN t.contents = :contents THEN 0 ELSE 1 END," +
            "t.contents")
    List<Tag> findTagsByContents(@Param("contents") String contents);
}
