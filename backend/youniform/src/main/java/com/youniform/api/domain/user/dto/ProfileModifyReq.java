package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ProfileModifyReq {
    @NotEmpty
    private String nickname;//닉네임

    @NotEmpty
    private String introduce;//한줄 소개
    
}
