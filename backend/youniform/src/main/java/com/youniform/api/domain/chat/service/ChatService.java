package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.domain.chat.dto.ChatMessageReq;

import java.time.LocalDateTime;

public interface ChatService {
    void addChatMessage(Long userId, Long roomId, String nickname, String content, String imageUrl, LocalDateTime messageTime);

    SliceDto<ChatMessageDto> getChatMessages(Long roomId, Long userId, ChatMessageReq request, int size);

    void updateLastReadTime(Long userId, Long roomId, LocalDateTime lastReadTime);
}