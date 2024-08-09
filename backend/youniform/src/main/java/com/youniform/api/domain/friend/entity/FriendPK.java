package com.youniform.api.domain.friend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendPK {
    private Long userId;

    private Long friendId;

    public static FriendPK toEntity(Long userId, Long friendId) {
        return FriendPK.builder()
                .userId(userId)
                .friendId(friendId)
                .build();
    }
}