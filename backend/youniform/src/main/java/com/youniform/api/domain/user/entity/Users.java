package com.youniform.api.domain.user.entity;

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

    private Long teamId;

    private String nickName;

    private String introduce;

    private String email;

    private String password;

    private String providerType;

    private String profileUrl;

    private Integer theme;

    private Boolean pushAlert;

    private LocalDateTime createdAt;

    private Boolean isDeleted;

    private LocalDateTime lastWriteDiary;
}
