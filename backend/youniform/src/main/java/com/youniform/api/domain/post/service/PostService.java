package com.youniform.api.domain.post.service;

import com.youniform.api.domain.post.dto.PostAddReq;
import com.youniform.api.domain.post.dto.PostAddRes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PostService {
    PostAddRes addPost(PostAddReq postAddReq, MultipartFile file, Long userId) throws IOException;
}
