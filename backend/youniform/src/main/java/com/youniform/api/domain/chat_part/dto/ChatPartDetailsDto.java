package com.youniform.api.domain.chat_part.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatPartDetailsDto {
    private Long userId;

    private Long roomId;

    private LocalDateTime lastReadTime;
}
