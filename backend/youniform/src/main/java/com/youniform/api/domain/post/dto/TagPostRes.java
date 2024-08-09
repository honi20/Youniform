package com.youniform.api.domain.post.dto;

import com.youniform.api.global.dto.SliceDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TagPostRes {
    private SliceDto<PostDto> postList;
}
