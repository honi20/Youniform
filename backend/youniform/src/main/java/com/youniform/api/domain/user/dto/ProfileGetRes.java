package com.youniform.api.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ProfileGetRes {
    private String nickname;//닉네임

    private String introduce;//한줄 소개

    private String profileUrl;//프로필 사진 URL

    private Integer theme;//테마

    private Boolean pushAlert;//알림 상태

    private LocalDate createdAt;//가입일

    private LocalDateTime lastWriteDiary;//다이어리 마지막 작성시간
}
