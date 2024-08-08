package com.youniform.api.domain.friend.service;

import com.youniform.api.domain.friend.dto.FriendRequestReq;
import com.youniform.api.domain.friend.entity.Status;

public interface FriendService {
    Status isFriend(Long userId, Long friendId);

    FriendRequestReq requestFriend(Long userId, String friendUuid);
}