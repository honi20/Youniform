package com.youniform.api.domain.chat.dto;

import com.youniform.api.domain.chat.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ChatRoomDetailsRes {
    private Long roomId;

    private String roomName;

    private boolean roomState;

    public static ChatRoomDetailsRes toDto(ChatRoom chatRoom) {
        return ChatRoomDetailsRes.builder()
                .roomId(chatRoom.getId())
                .roomName(chatRoom.getRoomName())
                .roomState(chatRoom.getRoomState())
                .build();
    }
}