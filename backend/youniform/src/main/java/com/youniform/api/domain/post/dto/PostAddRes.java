package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PostAddRes {
    private Long postId;

    public static PostAddRes toDto(Post post) {
        return PostAddRes.builder()
                .postId(post.getId())
                .build();
    }
}
