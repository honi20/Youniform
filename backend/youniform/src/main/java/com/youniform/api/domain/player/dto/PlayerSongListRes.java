package com.youniform.api.domain.player.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerSongListRes {
	private List<PlayerSongDto> songList;
}
