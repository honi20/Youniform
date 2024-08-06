package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.document.DatabaseSequence;
import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.document.ChatMessage;
import com.youniform.api.domain.chat.dto.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.ChatRoomListRes;
import com.youniform.api.domain.chat.entity.ChatRoom;
import com.youniform.api.domain.chat.repository.ChatMessageRepository;
import com.youniform.api.domain.chat.repository.ChatPartRepository;
import com.youniform.api.domain.chat.repository.ChatRoomRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.chat.entity.ChatRoom;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.youniform.api.global.statuscode.ErrorCode.CHATROOM_NOT_FOUND;
import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatMessageRepository chatMessageRepository;

    private final UserRepository userRepository;

    private final ChatRoomRepository chatRoomRepository;

    private final ChatPartRepository chatPartRepository;

    private final MongoOperations mongoOperations;

    private final S3Service s3Service;

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
    public ChatMessage processChatMessage(Long roomId, ChatMessage chatMessage, Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        return saveChatMessage(roomId, chatMessage, user);
    }

    @Override
    public ChatMessage saveChatMessage(Long roomId, ChatMessage chatMessage, Users user) {
        chatMessage.updateMessageId(createSequence(ChatMessage.CHAT_MESSAGE_SEQUENCE));
        chatMessage.updateRoomId(roomId);
        chatMessage.updateUuid(user.getUuid());
        chatMessage.updateMessageTime(LocalDateTime.now());

        return chatMessageRepository.save(chatMessage);
    }

    @Override
    public long createSequence(String seqName) {
        DatabaseSequence counter = mongoOperations.findAndModify(Query.query(Criteria.where("_id").is(seqName)),
                new Update().inc("seq", 1), FindAndModifyOptions.options().returnNew(true).upsert(true),
                DatabaseSequence.class);

        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }
}