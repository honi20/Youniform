package com.youniform.api.domain.like_post.service;

import com.youniform.api.domain.like_post.dto.PostLikeReq;
import com.youniform.api.domain.like_post.entity.LikePost;
import com.youniform.api.domain.like_post.entity.LikePostPK;
import com.youniform.api.domain.like_post.repository.LikePostRepository;
import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.post.repository.PostRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.youniform.api.global.statuscode.ErrorCode.POST_NOT_FOUND;
import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class LikePostServiceImpl implements LikePostService {
    private final PostRepository postRepository;
    private final LikePostRepository likePostRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void likePost(Long userId, Long postId, PostLikeReq postLikeReq) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        LikePostPK likePostPK = new LikePostPK(userId, postId);
        LikePost likePost = PostLikeReq.toEntity(likePostPK, post, user);

        if(postLikeReq.getIsLiked()) {
            likePostRepository.save(likePost);
        } else {
            likePostRepository.delete(likePost);
        }
    }
}
