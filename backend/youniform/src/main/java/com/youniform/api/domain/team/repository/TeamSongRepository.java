package com.youniform.api.domain.team.repository;

import com.youniform.api.domain.team.entity.TeamSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamSongRepository extends JpaRepository<TeamSong, Long> {
    List<TeamSong> findAllByTeamId(Long id);
}
