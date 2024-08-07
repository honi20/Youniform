package com.youniform.api.domain.team.dto;

import com.youniform.api.domain.team.entity.TeamSong;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TeamSongDto {
    private Long teamSongId;

    private String title;

    private String lyrics;

    private String type;

    private String link;

    public static TeamSongDto toDto(TeamSong teamSong) {
        return TeamSongDto.builder()
                .teamSongId(teamSong.getId())
                .title(teamSong.getTitle())
                .lyrics(teamSong.getLyrics())
                .type(String.valueOf(teamSong.getType()))
                .link(teamSong.getLink())
                .build();
    }
}
