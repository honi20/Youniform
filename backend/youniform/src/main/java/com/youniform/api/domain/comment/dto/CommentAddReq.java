package com.youniform.api.domain.comment.dto;

import com.youniform.api.domain.comment.entity.Comment;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentAddReq {
    private String contents;

    public Comment toEntity(Post post, Users user) {
        return Comment.builder()
                .content(contents)
                .createdAt(LocalDateTime.now())
                .user(user)
                .post(post)
                .build();
    }
}
