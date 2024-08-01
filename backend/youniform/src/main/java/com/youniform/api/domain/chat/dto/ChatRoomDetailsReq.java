package com.youniform.api.domain.chat.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChatRoomDetailsReq {
    @NotNull
    private Long roomId;
}