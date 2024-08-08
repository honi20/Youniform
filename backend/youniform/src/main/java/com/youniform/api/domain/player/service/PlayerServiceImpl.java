package com.youniform.api.domain.player.service;

import com.youniform.api.domain.player.dto.FavoritePlayerListRes;
import com.youniform.api.domain.player.dto.PlayerDetailDto;
import com.youniform.api.domain.player.dto.PlayerListDto;
import com.youniform.api.domain.player.dto.PlayerListRes;
import com.youniform.api.domain.player.entity.Player;
import com.youniform.api.domain.player.repository.PlayerRepository;
import com.youniform.api.domain.user.repository.UserPlayerCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;

    private final UserPlayerCustomRepository userPlayerCustomRepository;

    @Override
    public PlayerListRes findPlayers(Long teamId) {
        List<Player> players = playerRepository.findByTeamId(teamId);

        List<PlayerListDto> playerList = players.stream()
                .map(PlayerListDto::toDto)
                .toList();

        return new PlayerListRes(playerList);
    }

    @Override
    public FavoritePlayerListRes findFavoritePlayers(Long userId) {
        List<Player> players = userPlayerCustomRepository.findPlayerByUserId(userId);

        List<PlayerDetailDto> playerList = players.stream()
                .map(PlayerDetailDto::toDto)
                .toList();

        return new FavoritePlayerListRes(playerList);
    }
}