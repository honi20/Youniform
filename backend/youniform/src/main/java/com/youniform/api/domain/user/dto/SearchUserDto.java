package com.youniform.api.domain.user.dto;

import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserDto {
    private String userId;

    private String imgUrl;

    private String nickname;

    private String introduce;

    private String teamUrl;

    public static SearchUserDto toDto(Users user) {
        return SearchUserDto.builder()
                .userId(user.getUuid())
                .imgUrl(user.getProfileUrl())
                .nickname(user.getNickname())
                .introduce(user.getIntroduce())
                .teamUrl(user.getTeam().getImgUrl())
                .build();
    }
}
