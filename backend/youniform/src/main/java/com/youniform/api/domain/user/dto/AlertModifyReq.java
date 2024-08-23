package com.youniform.api.domain.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AlertModifyReq {
    @NotNull
    private boolean pushAlert;
    
}
