package com.youniform.api.domain.diary.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DiaryDetailDto {
    private Long writerId;

    private LocalDate date;

    private DiaryContentDto content;

    private String scope;
}
