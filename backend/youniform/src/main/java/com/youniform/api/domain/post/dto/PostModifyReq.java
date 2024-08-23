package com.youniform.api.domain.post.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PostModifyReq {
    @NotEmpty
    private String contents;

    private List<String> tags;
}
