package com.example.FootyFocus4.entity;

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

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUtcDate() { return utcDate; }
    public void setUtcDate(String utcDate) { this.utcDate = utcDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getMatchday() { return matchday; }
    public void setMatchday(Integer matchday) { this.matchday = matchday; }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public String getCompetitionName() { return competitionName; }
    public void setCompetitionName(String competitionName) { this.competitionName = competitionName; }

    public String getCompetitionCode() { return competitionCode; }
    public void setCompetitionCode(String competitionCode) { this.competitionCode = competitionCode; }

    public String getHomeTeamName() { return homeTeamName; }
    public void setHomeTeamName(String homeTeamName) { this.homeTeamName = homeTeamName; }

    public String getHomeTeamCrest() { return homeTeamCrest; }
    public void setHomeTeamCrest(String homeTeamCrest) { this.homeTeamCrest = homeTeamCrest; }

    public String getAwayTeamName() { return awayTeamName; }
    public void setAwayTeamName(String awayTeamName) { this.awayTeamName = awayTeamName; }

    public String getAwayTeamCrest() { return awayTeamCrest; }
    public void setAwayTeamCrest(String awayTeamCrest) { this.awayTeamCrest = awayTeamCrest; }
}
