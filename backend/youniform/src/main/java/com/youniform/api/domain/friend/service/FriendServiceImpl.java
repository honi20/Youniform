package com.youniform.api.domain.friend.service;

import com.youniform.api.domain.alert.entity.AlertType;
import com.youniform.api.domain.alert.service.AlertService;
import com.youniform.api.domain.friend.dto.*;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.youniform.api.domain.friend.entity.Status.FRIEND;
import static com.youniform.api.domain.friend.entity.Status.WAITING;
import static com.youniform.api.global.statuscode.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {
    private final FriendRepository friendRepository;

    private final UserRepository userRepository;

    private final AlertService alertService;

    @Override
    public Status isFriend(Long userId, Long friendId) {
        FriendPK friendPK = FriendPK.toEntity(userId, friendId);
        Friend friend = friendRepository.findByFriendPK(friendPK);

        return (friend != null) ? friend.getStatus() : null;
    }

    @Override
    @Transactional
    public FriendRequestReq requestFriend(Long userId, String friendUuid) {
        Users user = userRepository.findById(userId).get();

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        if (isFriend(userId, friend.getId()) == WAITING
                || isFriend(friend.getId(), userId) == WAITING) {
            throw new CustomException(FRIEND_REQUEST_EXIST);
        } else if (isFriend(userId, friend.getId()) == FRIEND) {
            throw new CustomException(FRIEND_ALREADY_EXIST);
        }

        FriendPK friendPk = FriendPK.toEntity(user.getId(), friend.getId());

        Friend friendRequest = Friend.toEntity(friendPk, user, friend, WAITING, null);

        friendRepository.save(friendRequest);

        return null;
    }

    @Override
    @Transactional
    public void acceptFriend(Long userId, String friendUuid) {
        Users user = userRepository.findById(userId).get();

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        if (isFriend(friend.getId(), userId) == null) {
            throw new CustomException(FRIEND_REQUEST_ABSCENT);
        } else if (isFriend(userId, friend.getId()) == FRIEND) {
            throw new CustomException(FRIEND_ALREADY_EXIST);
        }

        FriendPK friendPk1 = FriendPK.toEntity(friend.getId(), user.getId());
        Friend friendRequest1 = friendRepository.findByFriendPK(friendPk1);
        friendRequest1.updateStatus(FRIEND);
        friendRequest1.updateLastVisited(LocalDateTime.now());
        friendRepository.save(friendRequest1);

        FriendPK friendPk2 = FriendPK.toEntity(user.getId(), friend.getId());
        Friend friendRequest = Friend.toEntity(friendPk2, user, friend, FRIEND, LocalDateTime.now());
        friendRepository.save(friendRequest);

        alertService.send(user.getUuid(), friend.getId(), AlertType.FRIEND_ACCEPTANCE, null, null);
        alertService.send(friend.getUuid(), user.getId(), AlertType.FRIEND_ACCEPTANCE, null, null);
    }

    @Override
    @Transactional
    public void rejectFriend(Long userId, String friendUuid) {
        Users user = userRepository.findById(userId).get();

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        if (isFriend(friend.getId(), userId) == null) {
            throw new CustomException(FRIEND_REQUEST_ABSCENT);
        } else if (isFriend(userId, friend.getId()) == FRIEND) {
            throw new CustomException(FRIEND_ALREADY_EXIST);
        }

        FriendPK friendPk = FriendPK.toEntity(friend.getId(), user.getId());

        Friend friendRequest = friendRepository.findByFriendPK(friendPk);

        friendRepository.delete(friendRequest);
    }

    @Override
    public FriendMypageRes findMypageFriends(Long userId) {
        List<Friend> friends = friendRepository.findByFriendPKUserId(userId);

        List<FriendMypageDto> friendMypageDto = friends.stream()
                .map(FriendMypageDto::toDto)
                .collect(Collectors.toList());

        return FriendMypageRes.toDto(friendMypageDto);
    }

    public FriendDiaryRes findDiaryFriends(Long userId) {
        Users user = userRepository.findById(userId).get();

        List<Friend> friends = friendRepository.findByUserAndStatus(user, Status.FRIEND);

        List<FriendDiaryDto> friendDiaryDto = friends.stream()
                .map(friend -> {
                    LocalDateTime lastWriteDiary = friend.getFriend().getLastWriteDiary();
                    LocalDateTime lastVisited = friend.getLastVisited();

                    boolean isDiaryUpdated = lastWriteDiary != null && lastWriteDiary.isAfter(lastVisited);

                    return FriendDiaryDto.toDto(friend, isDiaryUpdated);
                })
                .collect(Collectors.toList());

        return FriendDiaryRes.toDto(friendDiaryDto);
    }

    @Override
    @Transactional
    public void removeFriend(Long userId, String friendUuid) {
        Users user = userRepository.findById(userId).get();

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        if (isFriend(userId, friend.getId()) == null
                || isFriend(userId, friend.getId()) == WAITING) {
            throw new CustomException(FRIEND_NOT_VALID);
        }

        FriendPK friendPk1 = FriendPK.toEntity(user.getId(), friend.getId());
        FriendPK friendPk2 = FriendPK.toEntity(friend.getId(), user.getId());

        Friend friendRequest1 = friendRepository.findByFriendPK(friendPk1);
        Friend friendRequest2 = friendRepository.findByFriendPK(friendPk2);

        friendRepository.delete(friendRequest1);
        friendRepository.delete(friendRequest2);
    }
}