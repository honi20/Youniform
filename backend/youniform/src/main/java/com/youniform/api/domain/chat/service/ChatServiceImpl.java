package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.dto.ChatMessageReq;
import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.entity.ChatPart;
import com.youniform.api.domain.chat.entity.ChatPartPK;
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
    public void addChatMessage(Long userId, Long roomId, String nickname, String content, String imageUrl, LocalDateTime messageTime) {
        // 유저와 채팅방 정보 무결성 검사
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        // 메시지를 ChatMessage 도큐먼트로 변환하여 저장
        ChatMessageDto chatMessageDto = ChatMessageDto.builder()
                .userId(userId)
                .roomId(roomId)
                .nickname(nickname)
                .content(content)
                .imageUrl(imageUrl)
                .messageTime(LocalDateTime.now())
                .build();

        ChatMessage chatMessage = ChatMessageDto.toDocument(chatMessageDto);
        chatMessageRepository.save(chatMessage);
    }

    @Override
    public SliceDto<ChatMessageDto> getChatMessages(Long roomId, Long userId, ChatMessageReq request, int size) {
        Pageable pageable = PageRequest.of(0, size);
        Slice<ChatMessage> slicedMessage;

        if (request.getLastReadTime() != null) {
            // 채팅방 입장 시
            slicedMessage = chatMessageRepository.findByRoomIdAndMessageTimeBeforeOrderByMessageTimeDesc(roomId, request.getLastReadTime(), pageable);
        } else if (request.getMessageId() != null && "before".equalsIgnoreCase(request.getDirection())) {
            // 이전 방향 스크롤 시
            slicedMessage = chatMessageRepository.findByRoomIdAndMessageIdBeforeOrderByMessageTimeDesc(roomId, request.getMessageId(), pageable);
        } else if (request.getMessageId() != null && "after".equalsIgnoreCase(request.getDirection())) {
            // 이후 방향 스크롤시
            slicedMessage = chatMessageRepository.findByRoomIdAndMessageIdAfterOrderByMessageTimeAsc(roomId, request.getMessageId(), pageable);
        } else {
            // 기본적으로 최신 메시지 조회
            slicedMessage = chatMessageRepository.findByRoomIdOrderByMessageTimeDesc(roomId, pageable);
        }

        List<ChatMessageDto> chatMessageDtos = slicedMessage.getContent().stream()
                .map(ChatMessageDto::toDto)
                .collect(Collectors.toList());

        SliceDto<ChatMessageDto> response = new SliceDto<>();
        response.setContent(chatMessageDtos);
        response.setPage(slicedMessage.getNumber() + 1);
        response.setSize(slicedMessage.getSize());
        response.setHasNext(slicedMessage.hasNext());

        return response;
    }

    @Override
    public void updateLastReadTime(Long userId, Long roomId, LocalDateTime lastReadTime) {
        ChatPartPK chatPartPK = new ChatPartPK(userId, roomId);
        ChatPart chatPart = chatPartRepository.findById(chatPartPK)
                .orElseThrow(() -> new CustomException(CHATPART_NOT_FOUND));
        chatPart.updateLastReadTime(lastReadTime);
        chatPartRepository.save(chatPart);
    }
}
