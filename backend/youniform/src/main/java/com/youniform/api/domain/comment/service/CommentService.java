package com.youniform.api.domain.comment.service;

import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;
import com.youniform.api.domain.comment.dto.CommentModifyReq;
import com.youniform.api.domain.comment.dto.CommentModifyRes;

public interface CommentService {
    CommentAddRes addComment(Long postId, Long userId, CommentAddReq commentAddReq);
    CommentModifyRes modifyComment(Long userId, Long commentId, CommentModifyReq commentModifyReq);
}
