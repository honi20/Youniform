package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.dto.*;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.dto.SliceDto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

public interface ChatService {
    ChatRoomListRes getChatRoomList(Long userId);

    ChatRoomDetailsRes getChatRoomDetails(Long roomId);

    SliceDto<ChatMessageDto> getChatMessages(Long roomId, int size);

    SliceDto<ChatMessageDto> getPreviousMessages(Long roomId, Long messageId, int size);

    SliceDto<ChatMessageDto> getNextMessages(Long roomId, Long messageId, int size);

    ChatMessage processChatMessage(Long roomId, ChatMessage chatMessage, Long userId);

    ChatMessage saveChatMessage(Long roomId, ChatMessage chatMessage, Users user);

    long createSequence(String seqName);

    ChatUploadImageRes uploadImage(MultipartFile file) throws IOException;

    InputStreamResource downloadImage(String imgUrl) throws IOException;

    void updateLastReadTime(Long userId, Long roomId, LocalDateTime lastReadTime);

    Long getRoomIdFromSessionId(String sessionId);

    void broadcastUserCount(Long roomId);
}