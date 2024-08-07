package com.youniform.api.domain.friend.service;

import com.youniform.api.domain.friend.dto.FriendRequestReq;

public interface FriendService {
    FriendRequestReq requestFriend(Long userId, String friendUuid);
}