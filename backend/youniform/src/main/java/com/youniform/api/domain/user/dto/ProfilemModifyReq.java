package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ProfilemModifyReq {
    @NotNull
    private String nickname;//닉네임

    @NotNull
    private String introduce;//한줄 소개

    @NotNull
    private String profileUrl;//프로필 사진 URL

    @NotNull
    private Integer theme;//테마

    @NotNull
    private Boolean pushAlert;//알림 상태

    @NotNull
    private LocalDate createdAt;//가입일

    @NotNull
    private LocalDateTime lastWriteDiary;//다이어리 마지막 작성시간
}
