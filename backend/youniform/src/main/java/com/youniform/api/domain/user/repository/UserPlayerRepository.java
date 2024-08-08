package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.user.entity.UserPlayer;
import com.youniform.api.domain.user.entity.UserPlayerPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPlayerRepository extends JpaRepository<UserPlayer, UserPlayerPK> {
    List<UserPlayer> findByUserId(Long userId);
}