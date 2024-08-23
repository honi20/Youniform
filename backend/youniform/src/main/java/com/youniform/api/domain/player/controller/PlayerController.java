package com.youniform.api.domain.player.controller;

import com.youniform.api.domain.player.dto.FavoritePlayerListRes;
import com.youniform.api.domain.player.dto.PlayerAlertModifyReq;
import com.youniform.api.domain.player.dto.PlayerListRes;
import com.youniform.api.domain.player.dto.PlayerSongListRes;
import com.youniform.api.domain.player.service.PlayerService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.statuscode.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.youniform.api.global.statuscode.SuccessCode.PLAYER_LIST_OK;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@Validated
public class PlayerController {
    private final JwtService jwtService;

    private final PlayerService playerService;

    @GetMapping("/list/{teamId}")
    public ResponseEntity<?> playerList(@PathVariable("teamId") Long teamId) {
        PlayerListRes response = playerService.findPlayers(teamId);

        return new ResponseEntity<>(ResponseDto.success(PLAYER_LIST_OK, response), HttpStatus.OK);
    }

    @GetMapping("/favorite")
    public ResponseEntity<?> favoritePlayerList() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        FavoritePlayerListRes response = playerService.findFavoritePlayers(userId);

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.FAVORITE_PLAYER_LIST_OK, response), HttpStatus.OK);
    }

    @GetMapping("/song/{playerId}")
    public ResponseEntity<?> playerSongList(@PathVariable("playerId") Long playerId) {
        PlayerSongListRes response = playerService.findPlayerSongs(playerId);

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.PLAYER_SONG_LIST_OK, response), HttpStatus.OK);
    }

    @PatchMapping("/alert/{playerId}")
    public ResponseEntity<?> playerAlertModify(@PathVariable("playerId") Long playerId, @RequestBody PlayerAlertModifyReq modifyReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        playerService.modifyPlayerAlert(userId, playerId, modifyReq);

        return new ResponseEntity<>(ResponseDto.success(SuccessCode.ALERT_MODIFIED, null), HttpStatus.OK);
    }

}
