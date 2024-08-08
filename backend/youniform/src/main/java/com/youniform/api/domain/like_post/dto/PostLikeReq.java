package com.youniform.api.domain.like_post.dto;

import com.youniform.api.domain.like_post.entity.LikePost;
import com.youniform.api.domain.like_post.entity.LikePostPK;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostLikeReq {
    private Boolean isLiked;

    public static LikePost toEntity(LikePostPK likePostPK, Post post, Users user) {
        return LikePost.builder()
                .likePostPK(likePostPK)
                .post(post)
                .user(user)
                .build();
    }
}
