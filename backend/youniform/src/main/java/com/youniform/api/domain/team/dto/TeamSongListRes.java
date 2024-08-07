package com.youniform.api.domain.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class TeamSongListRes {
    private List<TeamSongDto> teamSongList;
}
