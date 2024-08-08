package com.youniform.api.domain.tag.dto;

import com.youniform.api.domain.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
