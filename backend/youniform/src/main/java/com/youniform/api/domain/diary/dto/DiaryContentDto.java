package com.youniform.api.domain.diary.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Data
@NoArgsConstructor
@RedisHash("DairyContent")
public class DiaryContentDto {
    private String version;

    private List<DiaryContentObjectDto> objects;
}
