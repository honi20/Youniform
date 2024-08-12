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
import static com.youniform.api.global.statuscode.ErrorCode.FRIEND_NOT_FOUND;
import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

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
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        FriendPK friendPk1 = FriendPK.toEntity(user.getId(), friend.getId());
        FriendPK friendPk2 = FriendPK.toEntity(friend.getId(), user.getId());

        Friend friendRequest1 = Friend.toEntity(friendPk1, user, friend, WAITING, null);
        Friend friendRequest2 = Friend.toEntity(friendPk2, friend, user, WAITING, null);

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

        FriendPK friendPk1 = FriendPK.toEntity(user.getId(), friend.getId());
        FriendPK friendPk2 = FriendPK.toEntity(friend.getId(), user.getId());

        Friend friendRequest1 = friendRepository.findByFriendPK(friendPk1);
        Friend friendRequest2 = friendRepository.findByFriendPK(friendPk2);

        friendRequest1.updateStatus(FRIEND);
        friendRequest1.updateLastVisited(LocalDateTime.now());

        friendRequest2.updateStatus(FRIEND);
        friendRequest2.updateLastVisited(LocalDateTime.now());

        alertService.send(user.getUuid(), friend.getId(), AlertType.FRIEND_ACCEPTANCE, null, null);
        alertService.send(friend.getUuid(), user.getId(), AlertType.FRIEND_ACCEPTANCE, null, null);

        friendRepository.save(friendRequest1);
        friendRepository.save(friendRequest2);
    }

    @Override
    public FriendMypageRes findMypageFriends(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<Friend> friends = friendRepository.findByUserAndStatus(user, Status.FRIEND);

        List<FriendMypageDto> friendMypageDto = friends.stream()
                .map(FriendMypageDto::toDto)
                .collect(Collectors.toList());

        return FriendMypageRes.toDto(friendMypageDto);
    }

    public FriendDiaryRes findDiaryFriends(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

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
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Users friend = userRepository.findByUuid(friendUuid)
                .orElseThrow(() -> new CustomException(FRIEND_NOT_FOUND));

        FriendPK friendPk1 = FriendPK.toEntity(user.getId(), friend.getId());
        FriendPK friendPk2 = FriendPK.toEntity(friend.getId(), user.getId());

        Friend friendRequest1 = friendRepository.findByFriendPK(friendPk1);
        Friend friendRequest2 = friendRepository.findByFriendPK(friendPk2);

        friendRepository.delete(friendRequest1);
        friendRepository.delete(friendRequest2);
    }
}