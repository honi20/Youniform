package com.youniform.api.domain.like_post.service;

import com.youniform.api.domain.like_post.dto.PostLikeReq;

public interface LikePostService {
    void likePost(Long userId, Long postId, PostLikeReq postLikeReq);
}
