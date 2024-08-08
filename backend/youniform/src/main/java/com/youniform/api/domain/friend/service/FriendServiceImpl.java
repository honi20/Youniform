package com.youniform.api.domain.friend.service;

import com.youniform.api.domain.friend.dto.FriendListRes;
import com.youniform.api.domain.friend.dto.FriendRequestReq;
import com.youniform.api.domain.friend.entity.Friend;
import com.youniform.api.domain.friend.entity.FriendPK;
import com.youniform.api.domain.friend.entity.Status;
import com.youniform.api.domain.friend.repository.FriendRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.youniform.api.domain.friend.entity.Status.FRIEND;
import static com.youniform.api.domain.friend.entity.Status.WAITING;
import static com.youniform.api.global.statuscode.ErrorCode.FRIEND_NOT_FOUND;
import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {
    private final FriendRepository friendRepository;

    private final UserRepository userRepository;

    @Override
    public Status isFriend(Long userId, Long friendId) {
        Friend friend = friendRepository.findByFriendPK(new FriendPK(userId, friendId));

        return (friend != null) ? friend.getStatus() : null;
    }

    @Override
    @Transactional
    public FriendRequestReq requestFriend(Long userId, String friendUuid) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        FriendPK friendPk1 = new FriendPK(user.getId(), friend.getId());
        FriendPK friendPk2 = new FriendPK(friend.getId(), user.getId());

        Friend friendRequest1 = Friend.builder()
                .friendPK(friendPk1)
                .user(user)
                .friend(friend)
                .status(WAITING)
                .build();

        Friend friendRequest2 = Friend.builder()
                .friendPK(friendPk2)
                .user(friend)
                .friend(user)
                .status(WAITING)
                .build();

        friendRepository.save(friendRequest1);

        friendRepository.save(friendRequest2);

        return null;
    }

    @Override
    @Transactional
    public void acceptFriend(Long userId, String friendUuid) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        FriendPK friendPk1 = new FriendPK(user.getId(), friend.getId());
        FriendPK friendPk2 = new FriendPK(friend.getId(), user.getId());

        Friend friendRequest1 = friendRepository.findByFriendPK(friendPk1);
        Friend friendRequest2 = friendRepository.findByFriendPK(friendPk2);

        friendRequest1.updateStatus(FRIEND);
        friendRequest2.updateStatus(FRIEND);

        friendRepository.save(friendRequest1);
        friendRepository.save(friendRequest2);
    }

    @Override
    public FriendListRes getFriendList(Long userId) {
        return null;
    }

    @Override
    @Transactional
    public void removeFriend(Long userId, String friendUuid) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        FriendPK friendPk1 = new FriendPK(user.getId(), friend.getId());
        FriendPK friendPk2 = new FriendPK(friend.getId(), user.getId());

        Friend friendRequest1 = friendRepository.findByFriendPK(friendPk1);
        Friend friendRequest2 = friendRepository.findByFriendPK(friendPk2);

        friendRepository.delete(friendRequest1);
        friendRepository.delete(friendRequest2);
    }
}