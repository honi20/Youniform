package com.youniform.api.domain.comment.dto;

import com.youniform.api.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import static com.youniform.api.global.dateformat.DateFormatter.calculateTime;

@Data
@AllArgsConstructor
@Builder
public class CommentModifyRes {
    private String contents;
    private String updateAt;

    public static CommentModifyRes toDto(Comment comment) {
        return CommentModifyRes.builder()
                .contents(comment.getContent())
                .updateAt(calculateTime(comment.getUpdatedAt()))
                .build();
    }
}
