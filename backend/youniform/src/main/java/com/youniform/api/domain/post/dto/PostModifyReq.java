package com.youniform.api.domain.post.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostModifyReq {
    private String contents;

    private List<String> tags;
}
