package com.youniform.api.domain.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class PostListDto {
    private Long postId;

    private String profileImg;

    private String nickname;

    private String imageUrl;

    private String contents;

    private LocalDate createdAt;

    private Long commentCount;

    private String userId;

    private Boolean isLiked;
}
