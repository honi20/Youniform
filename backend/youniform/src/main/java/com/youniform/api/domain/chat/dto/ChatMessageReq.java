package com.youniform.api.domain.chat.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageReq {
    private LocalDateTime lastReadTime;

    private Long messageId;

    private String direction;
}