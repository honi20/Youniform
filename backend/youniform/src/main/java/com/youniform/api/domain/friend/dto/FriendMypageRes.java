package com.youniform.api.domain.friend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FriendMypageRes {
    private List<FriendMypageDto> friendMypageList;

    public static FriendMypageRes toDto(List<FriendMypageDto> friendMypageDto) {
        return FriendMypageRes.builder()
                .friendMypageList(friendMypageDto)
                .build();
    }
}