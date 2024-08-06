package com.youniform.api.domain.friend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FriendDeleteReq {
    @NotNull
    private String id;
}
