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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team teamId;

    private String nickname;

    private String introduce;

    private String email;

    private String password;

    private String providerType;

    private String profileUrl;

    private Theme theme;

    private Boolean pushAlert;

    private LocalDateTime createdAt;

    private Boolean isDeleted;

    private LocalDateTime lastWriteDiary;

    private String uuid;
}
