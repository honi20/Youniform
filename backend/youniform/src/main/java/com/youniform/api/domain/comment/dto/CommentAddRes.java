package com.youniform.api.domain.comment.dto;

import com.youniform.api.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import static com.youniform.api.global.dateformat.DateFormatter.calculateTime;

@Data
@AllArgsConstructor
@Builder
public class CommentAddRes {
    private Long commentId;
    private String imgUrl;
    private String nickname;
    private String userId;
    private String contents;
    private String createdAt;

    public static CommentAddRes toDto(Comment comment) {
        return CommentAddRes.builder()
                .commentId(comment.getId())
                .contents(comment.getContent())
                .createdAt(calculateTime(comment.getCreatedAt()))
                .imgUrl(comment.getUser().getProfileUrl())
                .nickname(comment.getUser().getNickname())
                .userId(comment.getUser().getUuid())
                .build();
    }
}
