package com.youniform.api.domain.diary.dto.list;

import com.youniform.api.domain.diary.dto.DiaryDetailDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryListRes {
    List<DiaryDetailDto> diaryList;
}
