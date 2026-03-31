package com.example.FootyFocus4.service;

import org.springframework.stereotype.Service;

import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.FootyFocus4.entity.TopScorer;

@Service
public class TopScorerService {
    @Value("${topScorer.api.url}")
    private String API_URL;

    @Value("${football.api.key}")
    private String API_KEY;

    public List<TopScorer> fetchTopScorersFromApi(String leagueCode, int season) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", API_KEY);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                API_URL, HttpMethod.GET, entity, Map.class, leagueCode, season);
        Map<String, Object> body = response.getBody();

        if (body == null) {
            throw new RuntimeException("Response body is null");
        }

        return mapToTopScorers(body);
    }

    private List<TopScorer> mapToTopScorers(Map<String, Object> body) {
        List<TopScorer> topScorersList = new ArrayList<>();

        Map<String, Object> competition = (Map<String, Object>) body.get("competition");
        Map<String, Object> season = (Map<String, Object>) body.get("season");
        List<Map<String, Object>> scorers = (List<Map<String, Object>>) body.get("scorers");

        for (Map<String, Object> scorerData : scorers) {
            TopScorer topScorer = new TopScorer();
            Map<String, Object> player = (Map<String, Object>) scorerData.get("player");
            Map<String, Object> team = (Map<String, Object>) scorerData.get("team");

            topScorer.setCompName((String) competition.get("name"));
            topScorer.setCompEmblem((String) competition.get("emblem"));
            topScorer.setSeasonStartDate((String) season.get("startDate"));
            topScorer.setSeasonEndDate((String) season.get("endDate"));
            topScorer.setCurrentMatchday(getIntOrDefault(season, "currentMatchday", 0));

            topScorer.setId(getIntOrDefault(player, "id", 0));
            topScorer.setPlayerName((String) player.get("name"));
            topScorer.setNationality((String) player.get("nationality"));
            topScorer.setSection((String) player.get("section"));

            if (team != null) {
                topScorer.setTeamName((String) team.get("name"));
                topScorer.setTeamShortName((String) team.get("shortName"));
                topScorer.setTeamCrest((String) team.get("crest"));
            }

            topScorer.setGoalsScored(getIntOrDefault(scorerData, "goals", 0));
            topScorer.setNoOfAssits(getIntOrDefault(scorerData, "assists", 0));

            topScorersList.add(topScorer);
        }

        return topScorersList;
    }

    private int getIntOrDefault(Map<String, Object> map, String key, int defaultValue) {
        Object value = map.get(key);
        return value != null ? (int) value : defaultValue;
    }
}
