package com.youniform.api.domain.post.dto;

import com.youniform.api.domain.tag.dto.TagDto;
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

    private List<TagDto> tags;

    private LocalDate createdAt;

    private Long commentCount;

    private String userId;

    private Boolean isLiked;

    private String teamUrl;

    public static PostDto toDto(PostListDto post, List<TagDto> tags) {
        return PostDto.builder()
                .postId(post.getPostId())
                .profileImg(post.getProfileImg())
                .nickname(post.getNickname())
                .imageUrl(post.getImageUrl())
                .contents(post.getContents())
                .tags(tags)
                .createdAt(post.getCreatedAt())
                .commentCount(post.getCommentCount())
                .userId(post.getUserId())
                .isLiked(post.getIsLiked())
                .teamUrl(post.getTeamUrl())
                .build();
    }
}
