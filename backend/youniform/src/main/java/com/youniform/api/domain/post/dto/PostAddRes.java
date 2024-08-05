package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.tag.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class PostAddRes {
    private Long postId;

    private String contents;

    private List<TagDto> tags;

    private String imageUrl;

    private LocalDate createdDate;

    private String userId;

    public static PostAddRes toDto(Post post, List<TagDto> tags, String userId) {
        return PostAddRes.builder()
                .postId(post.getId())
                .contents(post.getContents())
                .imageUrl(post.getImgUrl())
                .createdDate(post.getDate())
                .tags(tags)
                .userId(userId)
                .build();
    }
}
