package com.youniform.api.domain.friend.controller;

import com.youniform.api.domain.alert.service.AlertService;
import com.youniform.api.domain.friend.dto.*;
import com.youniform.api.domain.friend.service.FriendService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.youniform.api.domain.alert.entity.AlertType.FRIEND_REQUEST;
import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/friends")
@Validated
public class FriendController {
    private final FriendService friendService;

    private final AlertService alertService;

    private final JwtService jwtService;

    @PostMapping("/request")
    public ResponseEntity<?> friendRequest(@RequestBody FriendRequestReq friendRequestReq) {
//        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
//        String friendUuid = friendRequestReq.getFriendUuid();

        friendService.requestFriend(123L, "1604b772-adc0-4212-8a90-81186c57f100");

        alertService.send("1604b772-adc0-4212-8a90-81186c57f100", 123L, FRIEND_REQUEST, null, null);

        return new ResponseEntity<>(ResponseDto.success(FRIEND_REQUEST_OK, null), HttpStatus.CREATED);
    }

    @PostMapping("/accept")
    public ResponseEntity<?> friendAccept(@RequestBody FriendAcceptReq friendAcceptReq) {

        return new ResponseEntity<>(ResponseDto.success(FRIEND_ACCEPT_OK, null), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> friendList() {
        List<FriendDto> friendList = new ArrayList<>();

        for (int i = 0; i < 30; i++) {
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
    public ResponseEntity<?> friendDelete(@ModelAttribute @Valid FriendDeleteReq friendDeleteReq) {

        return new ResponseEntity<>(ResponseDto.success(FRIEND_DELETED, null), HttpStatus.OK);
    }
}
