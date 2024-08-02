package com.youniform.api.domain.friend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FriendListRes {
    private List<FriendDto> friendList;
}
