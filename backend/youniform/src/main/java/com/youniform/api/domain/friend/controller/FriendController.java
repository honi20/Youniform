package com.youniform.api.domain.friend.controller;

import com.youniform.api.domain.friend.dto.*;
import com.youniform.api.global.dto.ResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
@Validated
public class FriendController {
    @PostMapping("/request")
    public ResponseEntity<?> FriendRequest(@RequestBody FriendRequestReq friendRequestReq) {
        return new ResponseEntity<>(ResponseDto.success(FRIEND_REQUEST_OK, null), HttpStatus.CREATED);
    }

    @PostMapping("/accept")
    public ResponseEntity<?> FriendAccept(@RequestBody FriendAcceptReq friendAcceptReq) {
        return new ResponseEntity<>(ResponseDto.success(FRIEND_ACCEPT_OK, null), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> friendList() {
        List<FriendDto> friendList = new ArrayList<>();

        for(int i = 0; i < 30; i++) {
            friendList.add(FriendDto.builder()
                    .friendId("ewgrg0fgfdg0dfgfdg-sg43543gdf-bdfsdbgsdsd" + i)
                    .imgUrl("친구 프사 s3 url")
                    .nickname("친구 닉네임" + i)
                    .introduce("친구 자기소개" + i)
                    .build());
        }

        FriendListRes result = FriendListRes.builder()
                .friendList(friendList)
                .build();

        return new ResponseEntity<>(ResponseDto.success(FRIEND_LIST_OK, result), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> FriendDelete(@ModelAttribute @Valid FriendDeleteReq friendDeleteReq) {
        return new ResponseEntity<>(ResponseDto.success(FRIEND_DELETED, null), HttpStatus.OK);
    }
}
