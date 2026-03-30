package com.example.FootyFocus4.entity;

import lombok.*;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Data
@Transactional
@Setter
@Getter
@Entity
public class PlayerSearch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Player information
    private String idPlayer;
    private String strPlayer;
    private String strNationality;
    private String dateBorn;
    private String strStatus;
    private String strGender;
    private String strPosition;
    private String strSport;

    // Team information
    private String idTeam;
    private String strTeam;

    // Media
    private String strThumb;
    private String strCutout;

    // Search metadata
    private String relevance;
}
