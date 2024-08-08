package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.dto.*;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chats")
@Validated
public class ChatController {
    private final ChatService chatService;

//    private final JwtService jwtService;

    @GetMapping("/rooms")
    public ResponseEntity<?> getChatRoomList() {
//        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        ChatRoomListRes response = chatService.getChatRoomList(123L);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, response), HttpStatus.OK);
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<?> chatRoomDetails(@PathVariable("roomId") Long roomId,
                                             @RequestParam(defaultValue = "100") int size) {
        ChatRoomDetailsRes chatRoomDetails = chatService.getChatRoomDetails(roomId);
        SliceDto<ChatMessageDto> messages = chatService.getChatMessages(roomId, size);

        ChatMessageRes response = ChatMessageRes.toDto(chatRoomDetails, messages);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_DETAILS_OK, response), HttpStatus.OK);
    }

    @GetMapping("/messages/{roomId}/previous")
    public ResponseEntity<?> getPreviousMessages(@PathVariable("roomId") Long roomId,
                                                 @RequestParam Long messageId,
                                                 @RequestParam(defaultValue = "100") int size) {
        SliceDto<ChatMessageDto> response = chatService.getPreviousMessages(roomId, messageId, size);
        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, response), HttpStatus.OK);
    }

    @GetMapping("/messages/{roomId}/next")
    public ResponseEntity<?> getNextMessages(@PathVariable("roomId") Long roomId,
                                             @RequestParam Long messageId,
                                             @RequestParam(defaultValue = "100") int size) {
        SliceDto<ChatMessageDto> response = chatService.getNextMessages(roomId, messageId, size);
        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, response), HttpStatus.OK);
    }

    @PostMapping("/chats/messages/upload")
    public ResponseEntity<?> uploadImage(@RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        ChatUploadImageRes response = chatService.uploadImage(file);

        return new ResponseEntity<>(ResponseDto.success(IMAGE_UPLOAD_OK, response), HttpStatus.OK);
    }

    @GetMapping("/download/{imgUrl}")
    public ResponseEntity<?> downloadImage(@PathVariable String imgUrl) throws IOException {
        ChatDownloadImageRes response = chatService.downloadImage(imgUrl);

        return new ResponseEntity<>(ResponseDto.success(IMAGE_DOWNLOAD_OK, response), HttpStatus.OK);
    }
}