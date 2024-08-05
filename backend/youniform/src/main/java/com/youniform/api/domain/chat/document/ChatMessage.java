package com.youniform.api.domain.chat.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "chat_message")
public class ChatMessage {
    @Id
    private Long messageId;

    private Long roomId;

    private String userId;

    private String nickname;

    private String content;

    private String imageUrl;

    private LocalDateTime messageTime;

    public void setMessageTime(LocalDateTime messageTime) {
        this.messageTime = messageTime;
    }
}