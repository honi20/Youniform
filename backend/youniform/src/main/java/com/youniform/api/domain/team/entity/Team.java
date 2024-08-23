package com.youniform.api.domain.team.entity;

import jakarta.persistence.*;
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
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    private String name;

    private String hometown;

    private String homeGround;

    private LocalDate foundation;

    private Integer rank;

    private Integer matchCount;

    private Float winningRate;

    private Integer win;

    private String imgUrl;

    private String photoCardUrl;

    private String mainUrl;
}
