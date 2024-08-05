package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.dto.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.ChatRoomListRes;
import com.youniform.api.global.dto.SliceDto;

public interface ChatService {
    ChatRoomListRes getChatRoomList(Long userId);

    ChatRoomDetailsRes getChatRoomDetails(Long roomId);

    SliceDto<ChatMessageDto> getChatMessages(Long roomId, int size);

    SliceDto<ChatMessageDto> getPreviousMessages(Long roomId, Long messageId, int size);

    SliceDto<ChatMessageDto> getNextMessages(Long roomId, Long messageId, int size);

    ChatMessage processChatMessage(Long roomId, Long userId, ChatMessage chatMessage);

    ChatMessage saveChatMessage(ChatMessage chatMessage);
}