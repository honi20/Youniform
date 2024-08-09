package com.youniform.api.domain.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TagPostReq {
    private Long lastPostId;

    @NotNull
    private Long tagId;
}
