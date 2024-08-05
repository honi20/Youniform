package com.youniform.api.domain.tag.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TagListRes {
    private List<TagDto> tags;
}
