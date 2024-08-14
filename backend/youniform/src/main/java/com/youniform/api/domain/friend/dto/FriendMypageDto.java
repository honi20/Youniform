package com.youniform.api.domain.friend.dto;

import com.youniform.api.domain.friend.entity.Friend;
import com.youniform.api.domain.friend.entity.Status;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendMypageDto {
    private String userId;

    private String imgUrl;

    private String nickname;

    private String introduce;

    private String teamUrl;

    private Status status;

    public static FriendMypageDto toDto(Friend friend) {
        return FriendMypageDto.builder()
                .userId(friend.getFriend().getUuid())
                .imgUrl(friend.getFriend().getProfileUrl())
                .nickname(friend.getFriend().getNickname())
                .introduce(friend.getFriend().getIntroduce())
                .teamUrl(friend.getFriend().getTeam().getImgUrl())
                .status(friend.getStatus())
                .build();
    }
}