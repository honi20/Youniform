package com.youniform.api.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NicknameCheckRes {
    private boolean valid;
}
