package com.youniform.api.domain.post.dto;

import com.youniform.api.global.dto.SliceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PostListRes {
    private SliceDto<PostDto> postList;
    
}
