package com.youniform.api.domain.player.dto;

import com.youniform.api.domain.player.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDetailDto {
	private Long playerId;

	private String name;

	private LocalDate age;

	private Integer backNum;

	private Float battingAverage;

	private Integer hit;

	private Integer homerun;

	private Integer steal;

	private Float era;

	private Float whip;

	private Integer win;

	private Integer struck;

	private String position;

	private String twoWay;

	private Boolean pushAlert;

	public static PlayerDetailDto toDto(Player player, boolean isAlert) {
		return PlayerDetailDto.builder()
				.playerId(player.getId())
				.name(player.getName())
				.age(player.getAge())
				.backNum(player.getBackNum())
				.battingAverage(player.getBattingAverage())
				.hit(player.getHit())
				.homerun(player.getHomerun())
				.steal(player.getSteal())
				.era(player.getEra())
				.whip(player.getWhip())
				.win(player.getWin())
				.struck(player.getStruck())
				.position(player.getPosition())
				.twoWay(player.getTwoWay())
				.pushAlert(isAlert)
				.build();
	}
}
