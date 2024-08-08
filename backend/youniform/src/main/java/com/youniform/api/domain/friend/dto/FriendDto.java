package com.youniform.api.domain.friend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendDto {
    private String friendId;

    private String imgUrl;

    private String nickname;

    private String introduce;

    private String teamUrl;
}
