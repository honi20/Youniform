package com.youniform.api.domain.chat.controller;

import com.youniform.api.domain.chat.dto.ChatMessageDto;
import com.youniform.api.domain.chat.dto.ChatMessageRes;
import com.youniform.api.domain.chat.dto.ChatRoomDetailsRes;
import com.youniform.api.domain.chat.dto.ChatRoomListRes;
import com.youniform.api.domain.chat.service.ChatService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

import static com.youniform.api.global.statuscode.ErrorCode.FILE_CONVERT_FAIL;
import static com.youniform.api.global.statuscode.ErrorCode.FILE_DOWNLOAD_FAIL;
import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_DETAILS_OK;
import static com.youniform.api.global.statuscode.SuccessCode.CHATROOM_LIST_OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chats")
@Validated
public class ChatController {
    private final ChatService chatService;

    private final S3Service s3Service;

//    private final JwtService jwtService;

    @GetMapping("/rooms")
    public ResponseEntity<?> getChatRoomList() {
//        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        ChatRoomListRes chatRoomList = chatService.getChatRoomList(123L);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, chatRoomList), HttpStatus.OK);
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<?> chatRoomDetails(@PathVariable("roomId") Long roomId,
                                             @RequestParam(defaultValue = "100") int size) {
        ChatRoomDetailsRes chatRoomDetails = chatService.getChatRoomDetails(roomId);
        SliceDto<ChatMessageDto> messages = chatService.getChatMessages(roomId, size);

        ChatMessageRes chatMessageRes = ChatMessageRes.toDto(chatRoomDetails, messages);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_DETAILS_OK, chatMessageRes), HttpStatus.OK);
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
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile imageFile) {
        try {
            String imageUrl = s3Service.upload(imageFile, "chat_images");

            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            throw new CustomException(FILE_CONVERT_FAIL);
        }
    }

    @GetMapping("/chats/messages/download/{fileName}")
    public ResponseEntity<InputStreamResource> downloadImage(@PathVariable String fileName) {
        try {
            InputStream imageStream = s3Service.download(fileName);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(new InputStreamResource(imageStream));
        } catch (IOException e) {
            throw new CustomException(FILE_DOWNLOAD_FAIL);
        }
    }
}