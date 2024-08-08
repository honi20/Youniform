package com.youniform.api.domain.player.service;

import com.youniform.api.domain.player.dto.FavoritePlayerListRes;
import com.youniform.api.domain.player.dto.PlayerListRes;
import com.youniform.api.domain.player.dto.PlayerSongListRes;

public interface PlayerService {
    PlayerListRes findPlayers(Long teamId);

    FavoritePlayerListRes findFavoritePlayers(Long userId);

    PlayerSongListRes findPlayerSongs(Long playerId);
}