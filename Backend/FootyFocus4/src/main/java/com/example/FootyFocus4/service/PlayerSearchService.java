package com.example.FootyFocus4.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import com.example.FootyFocus4.entity.PlayerSearch;

@Service
public class PlayerSearchService {
    @Value("${player.search.api.url}")
    private String API_URL;

    public List<PlayerSearch> searchs(String playerName) {

        RestTemplate restTemplate = new RestTemplate();

        String url = API_URL + "?p=" + URLEncoder.encode(playerName, StandardCharsets.UTF_8);

        ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.GET, HttpEntity.EMPTY, Map.class);

        Map<String, Object> body = response.getBody();

        if (body == null) {
            throw new RuntimeException("Response body is null");
        }

        return mapToPlayers(body);
    }

      private List<PlayerSearch> mapToPlayers(Map<String, Object> body) {
        List<PlayerSearch> playerList = new ArrayList<>();

        List<Map<String, Object>> players = (List<Map<String, Object>>) body.get("player");

        if (players == null) {
            return playerList;
        }

        for (Map<String, Object> playerData : players) {
            PlayerSearch player = new PlayerSearch();

            player.setIdPlayer((String) playerData.get("idPlayer"));
            player.setStrPlayer((String) playerData.get("strPlayer"));
            player.setStrNationality((String) playerData.get("strNationality"));
            player.setDateBorn((String) playerData.get("dateBorn"));
            player.setStrStatus((String) playerData.get("strStatus"));
            player.setStrGender((String) playerData.get("strGender"));
            player.setStrPosition((String) playerData.get("strPosition"));
            player.setStrSport((String) playerData.get("strSport"));
            player.setIdTeam((String) playerData.get("idTeam"));
            player.setStrTeam((String) playerData.get("strTeam"));
            player.setStrThumb((String) playerData.get("strThumb"));
            player.setStrCutout((String) playerData.get("strCutout"));
            player.setRelevance((String) playerData.get("relevance"));

            playerList.add(player);
        }

        return playerList;
    }
}
