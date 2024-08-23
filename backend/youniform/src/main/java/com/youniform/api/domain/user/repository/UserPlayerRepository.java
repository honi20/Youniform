package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.user.entity.UserPlayer;
import com.youniform.api.domain.user.entity.UserPlayerPK;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserPlayerRepository extends JpaRepository<UserPlayer, UserPlayerPK> {
    List<UserPlayer> findByUserId(Long userId);

    @Query("select up from UserPlayer up where up.user.id = :userId and up.player.id = :playerId")
    UserPlayer findByUserPlayerPK(@Param("userId") Long userId, @Param("playerId") Long playerId);
}