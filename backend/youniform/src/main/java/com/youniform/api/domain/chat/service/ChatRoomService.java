package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.dto.ChatRoomDetailsReq;
import com.youniform.api.domain.chat.dto.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.ChatRoomListRes;

public interface ChatRoomService {
    ChatRoomDetailsRes getChatRoomDetails(Long roomId, ChatRoomDetailsReq chatRoomDetailsReq);

    ChatRoomListRes getChatRoomList();
}