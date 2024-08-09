package com.youniform.api.domain.friend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FriendDiaryRes {
    private List<FriendDiaryDto> friendDiaryList;

    public static FriendDiaryRes toDto(List<FriendDiaryDto> friendDiaryDto) {
        return FriendDiaryRes.builder()
                .friendDiaryList(friendDiaryDto)
                .build();
    }
}
