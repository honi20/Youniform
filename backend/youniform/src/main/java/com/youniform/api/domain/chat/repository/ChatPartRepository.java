package com.youniform.api.domain.chat.repository;

import com.youniform.api.domain.chat.entity.ChatPart;
import com.youniform.api.domain.chat.entity.ChatPartPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatPartRepository extends JpaRepository<ChatPart, ChatPartPK> {
    // 채팅방 참여자 조회
    List<ChatPart> findByRoomId(Long roomId);
    List<ChatPart> findByUserId(Long userId);
}