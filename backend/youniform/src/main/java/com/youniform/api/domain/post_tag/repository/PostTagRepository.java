package com.youniform.api.domain.post_tag.repository;

import com.youniform.api.domain.post_tag.entity.PostTag;
import com.youniform.api.domain.post_tag.entity.PostTagPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostTagRepository extends JpaRepository<PostTag, PostTagPK> {
}
