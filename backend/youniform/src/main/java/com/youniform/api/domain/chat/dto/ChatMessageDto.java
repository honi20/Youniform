package com.youniform.api.domain.chat.dto;

import com.youniform.api.domain.chat.document.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageDto {
    private Long roomId;

    private String nickname;

    private String content;

    private String imageUrl;

    private LocalDateTime messageTime;

    public static ChatMessageDto toDto(ChatMessage chatMessage) {
        return ChatMessageDto.builder()
                .roomId(chatMessage.getRoomId())
                .nickname(chatMessage.getNickname())
                .content(chatMessage.getContent())
                .imageUrl(chatMessage.getImageUrl())
                .messageTime(chatMessage.getMessageTime())
                .build();
    }
}