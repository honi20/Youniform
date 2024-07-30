package com.youniform.api.domain.chat_part.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatPartListRes {
    private Long roomId;

    private List<Long> chatPartList;
}
