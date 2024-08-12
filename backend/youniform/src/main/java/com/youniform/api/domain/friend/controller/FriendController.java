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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.domain.alert.entity.AlertType.FRIEND_REQUEST;
import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friends")
@Validated
public class FriendController {
    private final FriendService friendService;

    private final AlertService alertService;

    private final JwtService jwtService;

    @PostMapping("/request")
    public ResponseEntity<?> friendRequest(@RequestBody FriendRequestReq friendRequestReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        String friendUuid = friendRequestReq.getFriendUuid();

        friendService.requestFriend(userId, friendUuid);

        alertService.send(friendUuid, userId, FRIEND_REQUEST, null, null);

        return new ResponseEntity<>(ResponseDto.success(FRIEND_REQUEST_OK, null), HttpStatus.CREATED);
    }

    @PostMapping("/accept")
    public ResponseEntity<?> friendAccept(@RequestBody FriendAcceptReq friendAcceptReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        String friendUuid = friendAcceptReq.getFriendUuid();

        friendService.acceptFriend(userId, friendUuid);

        return new ResponseEntity<>(ResponseDto.success(FRIEND_ACCEPT_OK, null), HttpStatus.CREATED);
    }

    @GetMapping("/mypage")
    public ResponseEntity<?> friendMypage() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        FriendMypageRes friendList = friendService.findMypageFriends(userId);

        return new ResponseEntity<>(ResponseDto.success(FRIEND_LIST_OK, friendList), HttpStatus.OK);
    }

    @GetMapping("/diary")
    public ResponseEntity<?> friendDiary() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        FriendDiaryRes friendList = friendService.findDiaryFriends(userId);

        return new ResponseEntity<>(ResponseDto.success(FRIEND_LIST_OK, friendList), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> friendDelete(@ModelAttribute @Valid FriendDeleteReq friendDeleteReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        String friendUuid = friendDeleteReq.getFriendUuid();

        friendService.removeFriend(userId, friendUuid);

        return new ResponseEntity<>(ResponseDto.success(FRIEND_DELETED, null), HttpStatus.OK);
    }
}