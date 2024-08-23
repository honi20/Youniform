package com.youniform.api.domain.tag.dto;

import com.youniform.api.domain.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TagDto {
    private long tagId;

    private String contents;

    public static TagDto toDto(Tag tag) {
        return TagDto.builder()
                .tagId(tag.getId())
                .contents(tag.getContents())
                .build();
    }
}
