package com.youniform.api.domain.diary.dto.add;

import com.youniform.api.domain.diary.dto.DiaryContentDto;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DiaryAddReq {
    @NotNull
    private LocalDate diaryDate;

    @NotNull
    private DiaryContentDto contents;

    @NotNull
    private String scope;

    @NotNull
    private Long stampId;
}
