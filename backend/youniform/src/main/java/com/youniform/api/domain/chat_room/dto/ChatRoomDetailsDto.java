package com.youniform.api.domain.chat_room.dto;

import com.youniform.api.domain.chat_room.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDetailsDto {
    private Long roomId;

    private LocalDate roomName;

    private ChatRoom roomState;
}
