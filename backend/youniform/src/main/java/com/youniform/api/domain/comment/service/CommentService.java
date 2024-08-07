package com.youniform.api.domain.comment.service;

import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;

public interface CommentService {
    CommentAddRes addComment(Long postId, Long userId, CommentAddReq commentAddReq);
}
