package com.youniform.api.domain.diary.dto.modify;

import com.youniform.api.domain.diary.dto.DiaryContentDto;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaryModifyReq {
    @NotNull
    private DiaryContentDto content;

    @NotNull
    private String scope;

    @NotNull
    private Long stampId;
}
