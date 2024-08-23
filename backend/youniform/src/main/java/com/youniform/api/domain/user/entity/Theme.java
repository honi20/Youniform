package com.youniform.api.domain.user.entity;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Theme {
    MONSTERS(1000L),
    TIGERS(1001L),
    LIONS(1002L),
    TWINS(1003L),
    BEARS(1004L),
    LANDERS(1005L),
    WIZ(1006L),
    EAGLES(1007L),
    GIANTS(1008L),
    DINOS(1009L),
    HEROES(1010L);

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
