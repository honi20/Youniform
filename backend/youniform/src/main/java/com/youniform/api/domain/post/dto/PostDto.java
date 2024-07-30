package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class PostDto {
    private Long postId;

    private String profileImg;

    private String nickname;

    private String imageUrl;

    private String contents;

    private List<String> tags;

    private LocalDate createdAt;

    private Integer commentCount;

    public static PostDto toDto(Post post, Users user, List<String> tags, Integer commentCount) {
        return PostDto.builder()
                .postId(post.getId())
                .profileImg(user.getProfileUrl())
                .nickname(user.getNickname())
                .imageUrl(post.getImgUrl())
                .contents(post.getContents())
                .tags(tags)
                .createdAt(post.getDate())
                .commentCount(commentCount)
                .build();
    }
}
