package com.youniform.api.domain.chat.repository;

import com.youniform.api.domain.chat.entity.ChatPart;
import com.youniform.api.domain.chat.entity.ChatPartPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatPartRepository extends JpaRepository<ChatPart, ChatPartPK> {
    List<ChatPart> findByChatPartPK_UserId(Long userId);
}