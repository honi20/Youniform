package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.dto.*;
import com.youniform.api.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.youniform.api.global.statuscode.SuccessCode.CHAT_ROOMDETAILS_OK;
import static com.youniform.api.global.statuscode.SuccessCode.CHAT_ROOMLIST_OK;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
@Validated
public class ChatController {

    // 채팅방 조회
    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<?> chatRoomDetails(@PathVariable("roomId") Long roomId, @RequestBody ChatRoomDetailsReq chatRoomDetailsReq) {
        ChatRoomDetailsRes result = ChatRoomDetailsRes.builder()
                .roomId(roomId)
                .roomName("Room " + roomId)
                .roomState(roomId % 2 == 0)
                .build();

        return new ResponseEntity<>(ResponseDto.success(CHAT_ROOMDETAILS_OK, result), HttpStatus.OK);
    }

    // 채팅방 리스트 조회
    @GetMapping("/rooms")
    public ResponseEntity<?> chatRoomList() {
        List<ChatRoomDetailsRes> chatRoomList = new ArrayList<>();

        for (int i = 1; i < 6; i++) {
            chatRoomList.add(ChatRoomDetailsRes.builder()
                    .roomId((long) i)
                    .roomName("Room " + i)
                    .roomState(i % 2 == 0)
                    .build());
        }

        ChatRoomListRes result = ChatRoomListRes.builder()
                .chatRoomList(chatRoomList)
                .build();

        return new ResponseEntity<>(ResponseDto.success(CHAT_ROOMLIST_OK, result), HttpStatus.OK);
    }
}