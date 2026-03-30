package com.example.FootyFocus4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.*;

import com.example.FootyFocus4.entity.PlayerSearch;
import com.example.FootyFocus4.service.PlayerSearchService;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerSearchController {
@Autowired
    private PlayerSearchService playerService;

    @GetMapping("/search")
    public ResponseEntity<?> searchPlayers(@RequestParam String name) {
        try {
            List<PlayerSearch> players = playerService.searchs(name);
            return ResponseEntity.ok(players);

        } catch (HttpClientErrorException e) {
            return switch (e.getStatusCode().value()) {
                case 400 -> ResponseEntity.badRequest()
                        .body("Bad request — invalid player name: " + name);
                case 401 -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Unauthorized — invalid or missing API token.");
                case 403 -> ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Forbidden — your plan may not include player search.");
                case 404 -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No players found for: " + name);
                case 429 -> ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body("Rate limit reached — too many requests to the sports API.");
                default  -> ResponseEntity.status(e.getStatusCode())
                        .body("Client error: " + e.getMessage());
            };

        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("Sports API is currently unavailable. Please try again later.");

        } catch (ResourceAccessException e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Could not reach the sports API — possible network or timeout issue.");

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
