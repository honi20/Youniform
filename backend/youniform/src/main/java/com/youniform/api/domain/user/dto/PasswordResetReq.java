package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PasswordResetReq {
    @NotNull
    private String email;

    @NotNull
    private String password;
}
