package com.youniform.api.domain.comment.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CommentModifyReq {
    @NotEmpty
    private String contents;
}
