package com.youniform.api.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class ChatRoomListRes {
    private List<ChatRoomDetailsRes> chatRoomList;
}
