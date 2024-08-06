package com.youniform.api.domain.chat.dto;

import com.youniform.api.global.dto.SliceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRes {
    private ChatRoomDetailsRes chatRoomDetails;

    private SliceDto<ChatMessageDto> messages;

    public static ChatMessageRes toDto(ChatRoomDetailsRes chatRoomDetails, SliceDto<ChatMessageDto> messages) {
        return ChatMessageRes.builder()
                .chatRoomDetails(chatRoomDetails)
                .messages(messages)
                .build();
    }
}
