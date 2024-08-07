package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PostModifyRes {
    private Long postId;

    public static PostModifyRes toDto(Post post) {
        return PostModifyRes.builder()
                .postId(post.getId())
                .build();
    }
}
