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
                .nickname(comment.getUser().getNickname())
                .userId(comment.getUser().getUuid())
                .contents(comment.getContent())
                .createdAt(calculateTime(comment.getCreatedAt()))
                .updatedAt(convertTime(comment))
                .build();
    }

    private static String convertTime(Comment comment) {
        return comment.getUpdatedAt() == null ? "" : calculateTime(comment.getUpdatedAt());
    }
}