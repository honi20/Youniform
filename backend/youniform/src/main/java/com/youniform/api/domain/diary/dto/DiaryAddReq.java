package com.youniform.api.domain.diary.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaryAddReq {
    @NotNull
    private DiaryContentDto content;

    @NotNull
    private String scope;
}
