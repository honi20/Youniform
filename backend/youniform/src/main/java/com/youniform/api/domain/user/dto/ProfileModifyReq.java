package com.youniform.api.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ProfileModifyReq {
    private String nickname;//닉네임

    private String introduce;//한줄 소개
    
}
