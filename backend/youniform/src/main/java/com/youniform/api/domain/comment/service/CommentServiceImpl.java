package com.youniform.api.domain.comment.service;

import com.youniform.api.domain.alert.service.AlertService;
import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;
import com.youniform.api.domain.comment.dto.CommentModifyReq;
import com.youniform.api.domain.comment.dto.CommentModifyRes;
import com.youniform.api.domain.comment.entity.Comment;
import com.youniform.api.domain.comment.repository.CommentRepository;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.post.repository.PostRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.youniform.api.domain.alert.entity.AlertType.POST_COMMENT;
import static com.youniform.api.domain.comment.validation.CommentValidation.*;
import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final AlertService alertService;

    @Value("${POST_FRONT_URL}")
    private String url;

    @Override
    @Transactional
    public CommentAddRes addComment(Long postId, Long userId, CommentAddReq commentAddReq) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        validateContents(commentAddReq.getContents());
        Comment comment = commentAddReq.toEntity(post, user);

        commentRepository.save(comment);

        alertService.send(post.getUser().getUuid(), userId, POST_COMMENT,
                comment.getContent(), url+postId);

        return CommentAddRes.toDto(comment);
    }

    @Override
    @Transactional
    public CommentModifyRes modifyComment(Long userId, Long commentId, CommentModifyReq commentModifyReq) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(COMMENT_NOT_FOUND));

        validateContents(commentModifyReq.getContents());
        validateMyComment(comment.getUser().getId(), userId);

        comment.updateContent(commentModifyReq.getContents());
        comment.updateUpdatedAt();
        commentRepository.save(comment);

        return CommentModifyRes.toDto(comment);
    }

    @Override
    @Transactional
    public void removeComment(Long userId, Long commentId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(COMMENT_NOT_FOUND));

        validateMyCommentDeleted(comment.getUser().getId(), userId);

        commentRepository.delete(comment);
    }
}
