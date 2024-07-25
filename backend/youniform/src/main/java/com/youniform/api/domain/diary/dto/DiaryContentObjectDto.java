package com.youniform.api.domain.diary.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaryContentObjectDto {
    private String text;

    private String background;

    private String sticker;

    private String theme;

    private String imgUrl;
}
