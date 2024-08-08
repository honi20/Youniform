package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.user.entity.UserPlayer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPlayerRepository extends JpaRepository<UserPlayer, Long> {
    List<UserPlayer> findByUserId(Long userId);
}
