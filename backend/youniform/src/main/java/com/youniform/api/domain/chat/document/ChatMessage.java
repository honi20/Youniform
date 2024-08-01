package com.youniform.api.domain.chat.document;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document(collection = "chat_messages")
public class ChatMessage {
    @Id
    private Long messageId;

    private Long roomId;

    private Long userId;

    private String nickname;

    private String content;

    private String imageUrl;

    private LocalDateTime messageTime;
}