package com.youniform.api.domain.user.dto;

import com.youniform.api.domain.user.entity.Theme;
import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MyDetailsRes {
    private String nickname;//닉네임

    private String introduce;//한줄 소개

    private String profileUrl;//프로필 사진 URL

    private Theme theme;//테마

    private Boolean pushAlert;//알림 상태

    private Boolean playPushAlert;

    private String teamImage;

    private Long likePostCount;

    private Long friendCount;

    private String provider;

    private String photoCardUrl;

    public MyDetailsRes toDto(Users user, Long likePostCount, Long friendCount) {
        return MyDetailsRes.builder()
                .nickname(user.getNickname())
                .introduce(user.getIntroduce())
                .profileUrl(user.getProfileUrl() != null ? user.getProfileUrl() : null)
                .theme(user.getTheme())
                .pushAlert(user.getPushAlert())
                .playPushAlert(user.getPlayPushAlert())
                .teamImage(user.getTeam().getImgUrl())
                .likePostCount(likePostCount)
                .friendCount(friendCount)
                .provider(user.getProviderType())
                .profileUrl(user.getTeam().getPhotoCardUrl())
                .build();
    }
}
