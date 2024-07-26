package com.youniform.api.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LocalSigninRes {
    private String accessToken;

    private String refreshToken;
}
