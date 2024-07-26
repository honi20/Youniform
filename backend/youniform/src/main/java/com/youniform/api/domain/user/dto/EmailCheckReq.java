package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailCheckReq {
    @NotNull
    private String email;//유효한지 확인할 이메일
}
