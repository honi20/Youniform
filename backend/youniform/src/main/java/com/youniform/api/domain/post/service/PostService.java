package com.youniform.api.domain.post.service;

import com.youniform.api.domain.post.dto.PostAddReq;
import com.youniform.api.domain.post.dto.PostAddRes;
import com.youniform.api.domain.post.dto.PostModifyReq;
import com.youniform.api.domain.post.dto.PostModifyRes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PostService {
    PostAddRes addPost(PostAddReq postAddReq, MultipartFile file, Long userId) throws IOException;
    PostModifyRes modifyPost(PostModifyReq postModifyReq, MultipartFile file, Long postId, Long userId) throws IOException;
    void removePost(Long postId, Long userId) throws IOException;
}
