package com.example.FootyFocus4.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.transaction.Transactional;

@Transactional
@Setter
@Getter
@Entity
public class DetailedPlayer {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String playerName;

    private String dateOfBirth;

    private String nationality;

    private String section;

    private Integer shirtNumber;

    //from current team
    private String teamName;
    private String teamCrest;
    private String teamVenue;
}
