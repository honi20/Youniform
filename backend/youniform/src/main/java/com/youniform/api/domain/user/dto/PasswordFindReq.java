package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PasswordFindReq {
    @NotNull
    private String email;//비밀번호 재설정 이메일
}
