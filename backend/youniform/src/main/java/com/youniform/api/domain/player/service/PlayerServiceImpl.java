package com.youniform.api.domain.player.service;

import com.youniform.api.domain.player.dto.PlayerListDto;
import com.youniform.api.domain.player.dto.PlayerListRes;
import com.youniform.api.domain.player.entity.Player;
import com.youniform.api.domain.player.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public PlayerListRes findPlayers(Long teamId) {
        List<Player> players = playerRepository.findByTeamId(teamId);

        List<PlayerListDto> playerList = players.stream()
                .map(PlayerListDto::toDto)
                .toList();

        return new PlayerListRes(playerList);
    }
}