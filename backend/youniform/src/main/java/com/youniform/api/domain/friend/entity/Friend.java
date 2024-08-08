package com.youniform.api.domain.friend.entity;

import com.youniform.api.domain.user.entity.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Friend {
    @EmbeddedId
    private FriendPK friendPK;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    private Users friend;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime lastVisited;

    public void updateStatus(Status status) {
        this.status = status;
    }
}
