package com.youniform.api.domain.tag.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TagDto {
    private long tagId;

    private String contents;
}
