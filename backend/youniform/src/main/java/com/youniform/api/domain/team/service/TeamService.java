package com.youniform.api.domain.team.service;

import com.youniform.api.domain.team.dto.TeamDetailsRes;
import com.youniform.api.domain.team.dto.TeamSongListRes;

public interface TeamService {
    TeamSongListRes findTeamSongs(Long userId);

    TeamDetailsRes findTeamDetail(Long userId);
}
