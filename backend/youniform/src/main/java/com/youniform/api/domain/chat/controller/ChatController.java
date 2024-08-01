package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.dto.ChatRoomDetailsReq;
import com.youniform.api.domain.chat.dto.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.ChatRoomListRes;
import com.youniform.api.domain.chat.service.ChatRoomService;
import com.youniform.api.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_DETAILS_OK;
import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_LIST_OK;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
@Validated
public class ChatController {
    private final ChatRoomService chatRoomService;

    // 채팅방 조회
    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<?> chatRoomDetails(@PathVariable("roomId") Long roomId, @RequestBody ChatRoomDetailsReq chatRoomDetailsReq) {
        ChatRoomDetailsRes result = chatRoomService.getChatRoomDetails(roomId, chatRoomDetailsReq);
        return new ResponseEntity<>(ResponseDto.success(CHATROOM_DETAILS_OK, result), HttpStatus.OK);
    }

    // 채팅방 리스트 조회
    @GetMapping("/rooms")
    public ResponseEntity<?> chatRoomList() {
        ChatRoomListRes result = chatRoomService.getChatRoomList();
        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, result), HttpStatus.OK);
    }
}