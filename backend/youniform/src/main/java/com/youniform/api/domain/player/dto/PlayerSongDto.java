package com.youniform.api.domain.player.dto;

import com.youniform.api.domain.player.entity.CheeringSong;
import com.youniform.api.domain.player.entity.SongType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerSongDto {
	private Long songId;

	private String title;

	private String lyrics;

	private SongType type;

	private String link;

	public static PlayerSongDto toDto(CheeringSong song) {
		return PlayerSongDto.builder()
				.songId(song.getId())
				.title(song.getTitle())
				.lyrics(song.getLyrics())
				.type(song.getType())
				.link(song.getLink())
				.build();
	}
}
