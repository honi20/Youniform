package com.youniform.api.domain.team.controller;

import com.youniform.api.domain.team.dto.TeamDetailsRes;
import com.youniform.api.domain.team.dto.TeamSongListRes;
import com.youniform.api.domain.team.service.TeamService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.youniform.api.global.statuscode.SuccessCode.TEAM_DETAILS_OK;
import static com.youniform.api.global.statuscode.SuccessCode.TEAM_SONG_LIST_OK;

@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
@Validated
public class TeamController {
    private final JwtService jwtService;

    private final TeamService teamService;

    @GetMapping("/song")
    public ResponseEntity<?> teamSongList() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        TeamSongListRes response = teamService.findTeamSongs(userId);

        return new ResponseEntity<>(ResponseDto.success(TEAM_SONG_LIST_OK, response), HttpStatus.OK);
    }

    @GetMapping("/favorite")
    public ResponseEntity<?> favoriteTeamDetails() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        TeamDetailsRes response = teamService.findTeamDetail(userId);

        return new ResponseEntity<>(ResponseDto.success(TEAM_DETAILS_OK, response), HttpStatus.OK);
    }
}
