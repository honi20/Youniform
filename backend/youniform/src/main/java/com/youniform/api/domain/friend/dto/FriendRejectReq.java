package com.youniform.api.domain.friend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FriendRejectReq {
    @NotNull
    private String friendUuid;
}
