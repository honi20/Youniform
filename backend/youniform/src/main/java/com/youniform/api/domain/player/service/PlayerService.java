package com.youniform.api.domain.player.service;

import com.youniform.api.domain.player.dto.PlayerListRes;

public interface PlayerService {
    PlayerListRes findPlayers(Long teamId);
}