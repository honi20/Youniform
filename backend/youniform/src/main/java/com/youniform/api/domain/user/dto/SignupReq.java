package com.youniform.api.domain.user.dto;

import com.youniform.api.domain.team.entity.Team;
import com.youniform.api.domain.user.entity.Theme;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.jwt.entity.JwtRedis;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
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

    private List<Long> players;

    public Users toEntity(String uuid){
        return Users.builder()
                .uuid(uuid)
                .email(this.email)
                .password(this.password)
                .providerType(this.providerType)
                .profileUrl(this.profileUrl)
                .theme(Theme.MONSTERS)
                .nickname(this.nickname)
                .introduce(this.introduce)
                .isDeleted(false)
                .pushAlert(true)
                .createdAt(LocalDateTime.now())
                .lastWriteDiary(LocalDateTime.now())
                .team(Team.builder().id(1L).build())
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
