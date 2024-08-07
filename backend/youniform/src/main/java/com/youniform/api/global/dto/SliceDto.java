package com.youniform.api.global.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Slice;

import java.util.List;

@Data
@NoArgsConstructor
public class SliceDto<T> {
    private List<T> content;
    private int page;
    private int size;
    private boolean hasNext;

    public SliceDto(Slice<T> slice) {
        this.content = slice.getContent();
        this.page = slice.getNumber() + 1;
        this.size = slice.getSize();
        this.hasNext = slice.hasNext();
    }
}