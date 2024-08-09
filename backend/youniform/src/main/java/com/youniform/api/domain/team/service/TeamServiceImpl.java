package com.youniform.api.domain.team.service;

import com.youniform.api.domain.team.dto.TeamSongDto;
import com.youniform.api.domain.team.dto.TeamSongListRes;
import com.youniform.api.domain.team.entity.TeamSong;
import com.youniform.api.domain.team.repository.TeamSongRepository;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final UserRepository userRepository;

    private final TeamSongRepository teamSongRepository;

    @Override
    public TeamSongListRes findTeamSongs(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        List<TeamSong> teamSongs = teamSongRepository.findAllByTeamId(user.getTeam().getId());

        List<TeamSongDto> teamSongList = teamSongs.stream()
                .map(TeamSongDto::toDto)
                .toList();

        return new TeamSongListRes(teamSongList);
    }
}
