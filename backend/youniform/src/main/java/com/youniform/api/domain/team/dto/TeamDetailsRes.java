package com.youniform.api.domain.team.dto;

import com.youniform.api.domain.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class TeamDetailsRes {
    private String name;

    private String hometown;

    private String homeGround;

    private LocalDate foundation;

    private Integer rank;

    private Integer matchCount;

    private Float winningRate;

    private Integer win;

    private String imgUrl;

    public static TeamDetailsRes toDto(Team team) {
        return TeamDetailsRes.builder()
                .name(team.getName())
                .hometown(team.getHometown())
                .homeGround(team.getHomeGround())
                .foundation(team.getFoundation())
                .rank(team.getRank())
                .matchCount(team.getMatchCount())
                .winningRate(team.getWinningRate())
                .win(team.getWin())
                .imgUrl(team.getImgUrl())
                .build();
    }
}
