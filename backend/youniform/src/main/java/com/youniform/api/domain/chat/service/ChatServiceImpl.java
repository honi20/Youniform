package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.dto.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.ChatRoomListRes;
import com.youniform.api.domain.chat.repository.ChatMessageRepository;
import com.youniform.api.domain.chat.repository.ChatPartRepository;
import com.youniform.api.domain.chat.repository.ChatRoomRepository;
import com.youniform.api.domain.user.repository.UsersRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.chat.entity.ChatRoom;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatMessageRepository chatMessageRepository;

    private final UsersRepository usersRepository;

    private final ChatRoomRepository chatRoomRepository;

    private final ChatPartRepository chatPartRepository;

    @Override
    public ChatRoomListRes getChatRoomList(Long userId) {
        List<Long> roomIds = chatPartRepository.findByChatPartPK_UserId(userId)
                .stream()
                .map(chatPart -> chatPart.getChatPartPK().getRoomId())
                .toList();

        List<ChatRoomDetailsRes> chatRoomList = roomIds.stream().map(roomId -> {
            ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                    .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

            return ChatRoomDetailsRes.toDto(chatRoom);
        }).collect(Collectors.toList());

        return ChatRoomListRes.builder()
                .chatRoomList(chatRoomList)
                .build();
    }

    @Override
    public ChatRoomDetailsRes getChatRoomDetails(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        return ChatRoomDetailsRes.toDto(chatRoom);
    }

    @Override
    public SliceDto<ChatMessageDto> getChatMessages(Long roomId, int size) {
        Pageable pageable = PageRequest.of(0, size);
        Slice<ChatMessage> slicedMessages = chatMessageRepository.findByRoomIdOrderByMessageTimeDesc(roomId, pageable);

        List<ChatMessageDto> chatMessageDtos = slicedMessages.getContent()
                .stream()
                .map(ChatMessageDto::toDto)
                .collect(Collectors.toList());

        return new SliceDto<>(new SliceImpl<>(chatMessageDtos, pageable, slicedMessages.hasNext()));
    }

    @Override
    public SliceDto<ChatMessageDto> getPreviousMessages(Long roomId, Long messageId, int size) {
        Pageable pageable = PageRequest.of(0, size);
        Slice<ChatMessage> slicedMessages = chatMessageRepository.findByRoomIdAndMessageIdBeforeOrderByMessageTimeDesc(roomId, messageId, pageable);

        List<ChatMessageDto> chatMessageDtos = slicedMessages.getContent()
                .stream()
                .map(ChatMessageDto::toDto)
                .collect(Collectors.toList());

        return new SliceDto<>(new SliceImpl<>(chatMessageDtos, pageable, slicedMessages.hasNext()));
    }

    @Override
    public SliceDto<ChatMessageDto> getNextMessages(Long roomId, Long messageId, int size) {
        Pageable pageable = PageRequest.of(0, size);
        Slice<ChatMessage> slicedMessages = chatMessageRepository.findByRoomIdAndMessageIdAfterOrderByMessageTimeAsc(roomId, messageId, pageable);

        List<ChatMessageDto> chatMessageDtos = slicedMessages.getContent()
                .stream()
                .map(ChatMessageDto::toDto)
                .collect(Collectors.toList());

        return new SliceDto<>(new SliceImpl<>(chatMessageDtos, pageable, slicedMessages.hasNext()));
    }

    @Override
    public ChatMessage processChatMessage(Long roomId, Long userId, ChatMessage chatMessage) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        return saveChatMessage(chatMessage);
    }

    @Override
    public ChatMessage saveChatMessage(ChatMessage chatMessage) {
        chatMessage.setMessageTime(LocalDateTime.now());

        return chatMessageRepository.save(chatMessage);
    }
}