package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EmailVerifyReq {
    @NotNull
    private String email;

    @NotNull
    private String verifyCode;
}
