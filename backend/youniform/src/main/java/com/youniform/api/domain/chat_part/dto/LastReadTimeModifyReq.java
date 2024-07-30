package com.youniform.api.domain.chat_part.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LastReadTimeModifyReq {
    private LocalDateTime lastReadTime;
}
