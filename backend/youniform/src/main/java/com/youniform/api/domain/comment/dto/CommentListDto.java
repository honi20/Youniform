package com.youniform.api.domain.comment.dto;

import com.youniform.api.domain.comment.entity.Comment;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import static com.youniform.api.global.dateformat.DateFormatter.calculateTime;

@Data
@AllArgsConstructor
@Builder
public class CommentListDto {
    private Long commentId;
    private String imgUrl;
    private String nickname;
    private String contents;
    private String createAt;
    private String updateAt;

    public static CommentListDto toDto(Comment comment, Users user) {
        return CommentListDto.builder()
                .commentId(comment.getId())
                .imgUrl(user.getProfileUrl())
                .nickname(user.getNickName())
                .contents(comment.getContent())
                .createAt(calculateTime(comment.getCreatedAt()))
                .updateAt(calculateTime(comment.getUpdatedAt()))
                .build();
    }
}