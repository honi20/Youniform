package com.youniform.api.domain.diary.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Data
@NoArgsConstructor
@RedisHash("DairyContent")
public class DiaryContentDto {
    @Id
    private Long diaryId;

    private Long userId;

    private String text;

    private String background;

    private String stickers;

    private String font;

    private String theme;

    private List<String> imgUrls;
}
