package com.youniform.api.domain.friend.service;

import com.youniform.api.domain.friend.entity.Status;
import com.youniform.api.domain.friend.dto.FriendRequestReq;

public interface FriendService {
    Status isFriend(Long userId, Long friendId);
    FriendRequestReq requestFriend(Long userId, String friendUuid);
}
