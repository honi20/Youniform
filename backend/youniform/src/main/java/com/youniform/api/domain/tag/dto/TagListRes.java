package com.youniform.api.domain.tag.dto;

import com.youniform.api.domain.tag.entity.Tag;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class TagListRes {
    private List<TagDto> tags;

    public static TagListRes toTagListRes(List<Tag> tags) {
        return TagListRes.builder()
                .tags(tags.stream()
                        .map(TagDto::toDto)
                        .collect(Collectors.toList()))
                .build();
    }
}
