package com.youniform.api.domain.user.dto;

import com.youniform.api.domain.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileModifyRes {
    private String nickname;//닉네임

    private String introduce;//한줄 소개

    private String profileUrl;//프로필 사진 URL

    public ProfileModifyRes toDto(Users user) {
        return ProfileModifyRes.builder()
                .nickname(user.getNickname())
                .introduce(user.getIntroduce())
                .profileUrl(user.getProfileUrl() != null ? user.getProfileUrl() : null)
                .build();
    }
}
