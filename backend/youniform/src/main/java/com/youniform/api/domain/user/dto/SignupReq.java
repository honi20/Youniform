package com.youniform.api.domain.user.dto;

import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.jwt.entity.JwtRedis;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class SignupReq {
    @NotNull
    private String email;

    private String password;

    private String providerType;

    private String profileUrl;

    @NotNull
    private String nickname;

    @NotNull
    private String introduce;

    @NotNull
    private String team;

    private List<Integer> players;

    public Users toEntity(String uuid){
        return Users.builder()
                .uuid(uuid)
                .email(this.email)
                .password(this.password)
                .providerType(this.providerType)
                .profileUrl(this.profileUrl)
                .nickname(this.nickname)
                .introduce(this.introduce)
                .build();
    }

    public JwtRedis toRedis(String uuid, Long userId, String refreshToken){
        return JwtRedis.builder()
                .uuid(uuid)
                .userId(userId)
                .refreshToken(refreshToken)
                .build();
    }
}
