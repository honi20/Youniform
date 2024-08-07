package com.youniform.api.domain.player.entity;

import com.youniform.api.domain.team.entity.Team;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Player {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "player_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "team_id")
	private Team team;

	@NotNull
	private String name;

	@NotNull
	private LocalDate age;

	@NotNull
	private Integer backNum;

	private Float battingAverage;

	private Integer hit;

	private Integer homerun;

	private Integer steal;

	private Float era;

	private Float whip;

	private Integer win;

	private Integer struck;

	@NotNull
	private String position;

	@NotNull
	private String twoWay;
}
