package com.youniform.api.domain.tag.repository;

import com.youniform.api.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("SELECT t FROM Tag t " +
            "WHERE t.contents IN :names")
    List<Tag> findByContentsIn(List<String> names);

}
