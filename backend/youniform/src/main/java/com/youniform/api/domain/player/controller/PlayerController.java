package com.youniform.api.domain.player.controller;

import com.youniform.api.domain.player.dto.PlayerListRes;
import com.youniform.api.domain.player.service.PlayerService;
import com.youniform.api.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.youniform.api.global.statuscode.SuccessCode.PLAYER_LIST_OK;

@RestController
@RequestMapping("/players")
@RequiredArgsConstructor
@Validated
public class PlayerController {
    private final PlayerService playerService;

    @GetMapping("/{teamId}")
    public ResponseEntity<?> playerList(@PathVariable("teamId") Long teamId) {
        PlayerListRes response = playerService.findPlayers(teamId);

        return new ResponseEntity<>(ResponseDto.success(PLAYER_LIST_OK, response), HttpStatus.OK);
    }
}
