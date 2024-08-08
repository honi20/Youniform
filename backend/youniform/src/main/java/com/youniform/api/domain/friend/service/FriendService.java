package com.youniform.api.domain.friend.service;

import com.youniform.api.domain.friend.dto.FriendListRes;
import com.youniform.api.domain.friend.dto.FriendRequestReq;
import com.youniform.api.domain.friend.entity.Status;

public interface FriendService {
    Status isFriend(Long userId, Long friendId);

    FriendRequestReq requestFriend(Long userId, String friendUuid);

    void acceptFriend(Long userId, String friendUuid);

    FriendListRes getFriendList(Long userId);

    void removeFriend(Long userId, String friendUuid);
}