package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.dto.*;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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

    @PostMapping("/messages/upload")
    public ResponseEntity<?> uploadImage(@RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        ChatUploadImageRes response = chatService.uploadImage(file);

        return new ResponseEntity<>(ResponseDto.success(IMAGE_UPLOAD_OK, response), HttpStatus.OK);
    }

    @GetMapping("/messages/download")
    public ResponseEntity<?> downloadImage(@RequestParam String imgUrl) throws IOException {
        InputStreamResource resource = chatService.downloadImage(imgUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);  // 파일 타입을 동적으로 설정하려면 적절한 방식으로 변경
        headers.setContentDispositionFormData("attachment", imgUrl);  // 파일 이름을 동적으로 설정

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}