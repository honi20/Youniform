package com.youniform.api.domain.tag.dto;

import com.youniform.api.domain.tag.entity.Tag;
import lombok.Data;

@Data
public class TagAdd {
    private String tag;

    public static Tag toEntity(String tag) {
        return Tag.builder()
                .contents(tag)
                .build();
    }
}
