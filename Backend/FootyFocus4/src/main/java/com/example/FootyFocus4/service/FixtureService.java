package com.example.FootyFocus4.service;

import com.example.FootyFocus4.entity.Fixture;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FixtureService {
    @Value("${fixtures.api.url}")
    private String API_URL;

    @Value("${football.api.key}")
    private String API_KEY;

    public List<Fixture> getUpcomingFixtures(Long teamId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", API_KEY);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(API_URL + teamId + "/matches?status=SCHEDULED", HttpMethod.GET, entity, Map.class);
        Map<String, Object> body = response.getBody();
        if (body == null || !body.containsKey("matches")) {
            return Collections.emptyList();
        }
        List<Map<String, Object>> matches = (List<Map<String, Object>>) body.get("matches");
        return matches.stream().map(this::mapToFixture).collect(Collectors.toList());
    }

    private Fixture mapToFixture(Map<String, Object> match) {
        Fixture fixture = new Fixture();
        fixture.setId(((Number) match.get("id")).longValue());
        fixture.setUtcDate((String) match.get("utcDate"));
        fixture.setStatus((String) match.get("status"));
        fixture.setMatchday(match.get("matchday") != null ? ((Number) match.get("matchday")).intValue() : null);
        fixture.setStage((String) match.get("stage"));
        Map<String, Object> competition = (Map<String, Object>) match.get("competition");
        if (competition != null) {
            fixture.setCompetitionName((String) competition.get("name"));
            fixture.setCompetitionCode((String) competition.get("code"));
        }
        Map<String, Object> homeTeam = (Map<String, Object>) match.get("homeTeam");
        if (homeTeam != null) {
            fixture.setHomeTeamName((String) homeTeam.get("name"));
            fixture.setHomeTeamCrest((String) homeTeam.get("crest"));
            fixture.setHomeTeamtla((String) homeTeam.get("tla"));
        }
        Map<String, Object> awayTeam = (Map<String, Object>) match.get("awayTeam");
        if (awayTeam != null) {
            fixture.setAwayTeamName((String) awayTeam.get("name"));
            fixture.setAwayTeamCrest((String) awayTeam.get("crest"));
            fixture.setAwayTeamtla((String) awayTeam.get("tla"));
        }
        return fixture;
    }
}
