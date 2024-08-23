package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PasswordResetReq {
    @NotNull
    private String uuid;

    @NotNull
    private String verify;

    @NotNull
    private String password;

    @NotNull
    private String confirmPassword;
}
