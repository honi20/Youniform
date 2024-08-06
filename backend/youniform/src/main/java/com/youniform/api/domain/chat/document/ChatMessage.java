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
    public static final String CHAT_MESSAGE_SEQUENCE = "chat_message_sequence";

    @Id
    private Long messageId;

    private Long roomId;

    private String uuid;

    private String nickname;

    private String content;

    private String imageUrl;

    private LocalDateTime messageTime;

    public void updateMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public void updateRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public void updateUuid(String uuid) {
        this.uuid = uuid;
    }

    public void updateMessageTime(LocalDateTime messageTime) {
        this.messageTime = messageTime;
    }
}