package com.youniform.api.domain.team.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.Date;

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

    private Integer match;

    private Float winningRate;

    private Integer win;
}
