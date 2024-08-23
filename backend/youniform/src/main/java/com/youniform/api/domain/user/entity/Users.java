package com.youniform.api.domain.user.entity;

import com.youniform.api.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    private String nickname;

    private String introduce;

    private String email;

    private String password;

    private String providerType;

    private String profileUrl;

    private Theme theme;

    private Boolean pushAlert = Boolean.TRUE;

    private Boolean playPushAlert = Boolean.TRUE;

    private LocalDateTime createdAt = LocalDateTime.now();

    private Boolean isDeleted = Boolean.FALSE;

    private LocalDateTime lastWriteDiary;

    private String uuid;

    public void updateProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public void updateTeam(Team team) {
        this.team = team;
    }

    public void updateLastWriteDiary(LocalDateTime lastWriteDiary) {
        this.lastWriteDiary = lastWriteDiary;
    }

    public void updatePlayPushAlert(boolean pushAlert) {
        this.playPushAlert = pushAlert;
    }
}
