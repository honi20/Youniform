package com.youniform.api.domain.player.service;

import com.youniform.api.domain.player.dto.*;
import com.youniform.api.domain.player.entity.CheeringSong;
import com.youniform.api.domain.player.entity.Player;
import com.youniform.api.domain.player.repository.CheeringSongRepository;
import com.youniform.api.domain.player.repository.PlayerRepository;
import com.youniform.api.domain.user.entity.UserPlayer;
import com.youniform.api.domain.user.repository.UserPlayerCustomRepository;
import com.youniform.api.domain.user.repository.UserPlayerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;

    private final UserPlayerCustomRepository userPlayerCustomRepository;

    private final CheeringSongRepository cheeringSongRepository;

    private final UserPlayerRepository userPlayerRepository;

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
        List<UserPlayer> userPlayers = userPlayerCustomRepository.findPlayerByUserId(userId);

        List<PlayerDetailDto> playerList = userPlayers.stream()
                .map(userPlayer -> PlayerDetailDto.toDto(userPlayer.getPlayer(), userPlayer.getPushAlert()))
                .toList();

        return new FavoritePlayerListRes(playerList);
    }

    @Override
    public PlayerSongListRes findPlayerSongs(Long playerId) {
        List<CheeringSong> songs = cheeringSongRepository.findByPlayerId(playerId);

        List<PlayerSongDto> songList = songs.stream()
                .map(PlayerSongDto::toDto)
                .toList();

        return new PlayerSongListRes(songList);
    }

    @Override
    @Transactional
    public void modifyPlayerAlert(Long userId, Long playerId, PlayerAlertModifyReq modifyReq) {
        UserPlayer userPlayer = userPlayerRepository.findByUserPlayerPK(userId, playerId);

        userPlayer.updatePushAlert(modifyReq.isPushAlert());

        userPlayerRepository.save(userPlayer);
    }

}