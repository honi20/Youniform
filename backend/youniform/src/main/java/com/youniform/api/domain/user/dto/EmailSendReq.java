package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class EmailSendReq {
    @NotEmpty
    private String email;
    
}
