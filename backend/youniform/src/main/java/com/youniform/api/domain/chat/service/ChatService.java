package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.dto.*;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.dto.SliceDto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    ChatDownloadImageRes downloadImage(String imgUrl) throws IOException;
}