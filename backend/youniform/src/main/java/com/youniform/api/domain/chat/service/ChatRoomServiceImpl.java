package com.youniform.api.domain.chat.service;

import com.youniform.api.domain.chat.dto.ChatRoomDetailsReq;
import com.youniform.api.domain.chat.dto.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.ChatRoomListRes;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {
    @Override
    public ChatRoomDetailsRes getChatRoomDetails(Long roomId, ChatRoomDetailsReq chatRoomDetailsReq) {
        return ChatRoomDetailsRes.builder()
                .roomId(roomId)
                .roomName("Room " + roomId)
                .roomState(roomId % 2 == 0)
                .build();
    }

    @Override
    public ChatRoomListRes getChatRoomList() {
        List<ChatRoomDetailsRes> chatRoomList = new ArrayList<>();

        for (int i = 1; i < 6; i++) {
            chatRoomList.add(ChatRoomDetailsRes.builder()
                    .roomId((long) i)
                    .roomName("Room " + i)
                    .roomState(i % 2 == 0)
                    .build());
        }

        return ChatRoomListRes.builder()
                .chatRoomList(chatRoomList)
                .build();
    }
}
