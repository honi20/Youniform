package com.youniform.api.domain.post.repository;

import com.youniform.api.domain.post.dto.PostDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface PostCustomRepository {
    Slice<PostDto> findPostByCursor(@Param("userId") Long userId,
                                    @Param("lastPostId") Long lastPostId,
                                    @Param("pageable")Pageable pageable);
}
