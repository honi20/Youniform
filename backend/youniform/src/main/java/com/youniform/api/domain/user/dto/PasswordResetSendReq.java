package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class PasswordResetSendReq {
    @NotEmpty
    private String email;
}
