package com.youniform.api.domain.post.service;

import com.youniform.api.domain.post.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PostService {
    PostAddRes addPost(PostAddReq postAddReq, MultipartFile file, Long userId) throws IOException;
    PostModifyRes modifyPost(PostModifyReq postModifyReq, MultipartFile file, Long postId, Long userId) throws IOException;
    void removePost(Long postId, Long userId) throws IOException;
    PostDetailsRes findPost(Long postId, Long userId);
    PostListRes findPublicPosts(Long userId, PublicPostListReq publicPostListReq, Pageable pageable);
    PostListRes findMyPosts(Long userId, MyPostListReq myPostListReq, Pageable pageable);
}
