package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LocalSigninReq {
    @NotNull
    private String email;

    @NotNull
    private String password;
}
