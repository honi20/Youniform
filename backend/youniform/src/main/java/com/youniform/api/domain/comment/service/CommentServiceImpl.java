package com.youniform.api.domain.comment.service;

import com.youniform.api.domain.comment.dto.CommentAddReq;
import com.youniform.api.domain.comment.dto.CommentAddRes;
import com.youniform.api.domain.comment.entity.Comment;
import com.youniform.api.domain.comment.repository.CommentRepository;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.post.repository.PostRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.youniform.api.domain.comment.validation.CommentValidation.validateContents;
import static com.youniform.api.global.statuscode.ErrorCode.POST_NOT_FOUND;
import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

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

        return CommentAddRes.toDto(comment);
    }
}
