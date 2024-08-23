package com.youniform.api.domain.chat.repository;

import com.youniform.api.domain.chat.document.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, Long> {
    Slice<ChatMessage> findByRoomIdAndMessageIdBeforeOrderByMessageTimeDesc(Long roomId, Long messageId, Pageable pageable);

    Slice<ChatMessage> findByRoomIdAndMessageIdAfterOrderByMessageTimeAsc(Long roomId, Long messageId, Pageable pageable);

    Slice<ChatMessage> findByRoomIdOrderByMessageTimeDesc(Long roomId, Pageable pageable);
}