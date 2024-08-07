package com.youniform.api.domain.comment.dto;

import com.youniform.api.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import static com.youniform.api.global.dateformat.DateFormatter.calculateTime;

@Data
@AllArgsConstructor
@Builder
public class CommentDto {
    private Long commentId;
    private String imgUrl;
    private String nickname;
    private String userId;
    private String contents;
    private String createdAt;
    private String updatedAt;

    public static CommentDto toDto(Comment comment) {
        return CommentDto.builder()
                .commentId(comment.getId())
                .imgUrl(comment.getUser().getProfileUrl())
                .nickname(comment.getUser().getProfileUrl())
                .userId(comment.getUser().getProfileUrl())
                .contents(comment.getContent())
                .createdAt(calculateTime(comment.getCreatedAt()))
                .updatedAt(calculateTime(comment.getUpdatedAt()))
                .build();
    }
}