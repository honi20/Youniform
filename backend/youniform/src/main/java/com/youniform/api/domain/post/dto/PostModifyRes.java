package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.tag.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class PostModifyRes {
    private String contents;

    private List<TagDto> tags;

    private String imageUrl;

    private String userId;

    public static PostModifyRes toDto(Post post, List<TagDto> tags, String userId) {
        return PostModifyRes.builder()
                .contents(post.getContents())
                .imageUrl(post.getImgUrl())
                .tags(tags)
                .userId(userId)
                .build();
    }
}
