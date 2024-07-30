package com.youniform.api.domain.chat_room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomListRes {
    private List<ChatRoomDetailsDto> chatRoomList;
}
