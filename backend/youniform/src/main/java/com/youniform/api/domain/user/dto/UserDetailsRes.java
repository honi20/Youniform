package com.youniform.api.domain.user.dto;

import com.youniform.api.domain.friend.entity.Status;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserDetailsRes {
    private String userId;

    private String nickname;

    private String introduce;

    private String profileUrl;

    private String teamImage;

    private Status isFriend;

    public UserDetailsRes toDto(Users user, Status isFriend) {
        return UserDetailsRes.builder()
                .userId(user.getUuid())
                .nickname(user.getNickname())
                .introduce(user.getIntroduce())
                .profileUrl(user.getProfileUrl() != null ? user.getProfileUrl() : null)
                .teamImage(user.getTeam().getImgUrl())
                .isFriend(isFriend)
                .build();
    }
}
