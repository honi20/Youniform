package com.youniform.api.domain.team.service;

import com.youniform.api.domain.team.dto.TeamSongListRes;

public interface TeamService {
    TeamSongListRes findTeamSongs(Long userId);
}
