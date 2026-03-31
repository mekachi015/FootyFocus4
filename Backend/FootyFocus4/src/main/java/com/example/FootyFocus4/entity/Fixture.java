package com.example.FootyFocus4.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Fixture {
    private Long id;
    private String utcDate;
    private String status;
    private Integer matchday;
    private String stage;
    private String competitionName;
    private String competitionCode;
    private String homeTeamName;
    private String homeTeamCrest;
    private String awayTeamName;
    private String awayTeamCrest;
    private String homeTeamtla;
    private String awayTeamtla;

   
}
