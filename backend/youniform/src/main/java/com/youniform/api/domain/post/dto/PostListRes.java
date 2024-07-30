package com.youniform.api.domain.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class PostListRes {
    private List<PostDto> postList;
    
}
