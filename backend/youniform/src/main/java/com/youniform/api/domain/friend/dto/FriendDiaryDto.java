package com.youniform.api.domain.friend.dto;

import com.youniform.api.domain.friend.entity.Friend;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendDiaryDto {
    private String friendId;

    private String imgUrl;

    private String nickname;

    private boolean isDiaryUpdated;

    public static FriendDiaryDto toDto(Friend friend, boolean isDiaryUpdated) {
        return FriendDiaryDto.builder()
                .friendId(friend.getFriend().getUuid())
                .imgUrl(friend.getFriend().getProfileUrl())
                .nickname(friend.getFriend().getNickname())
                .isDiaryUpdated(isDiaryUpdated)
                .build();
    }
}