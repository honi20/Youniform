package com.youniform.api.domain.user.entity;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Theme {
    MONSTERS(1000L),
    KT(1006L),
    SSG(1005L),
    DOOSAN(1004L),
    LOTTE(1008L),
    SAMSUNG(1002L),
    KIWOOM(1010L),
    KIA(1001L),
    HANWHA(1007L),
    LG(1003L),
    NC(1009L);

    private final long teamId;

    Theme(long teamId) {
        this.teamId = teamId;
    }

    public long getTeamId() {
        return teamId;
    }

    private static final Map<Long, Theme> BY_TEAM_ID =
            Stream.of(values()).collect(Collectors.toMap(Theme::getTeamId, e -> e));

    public static Theme valueOfLabel(long teamId) {
        Theme theme = BY_TEAM_ID.get(teamId);
        if (theme == null) {
            throw new IllegalArgumentException("No Theme with id " + teamId);
        }
        return theme;
    }
}
