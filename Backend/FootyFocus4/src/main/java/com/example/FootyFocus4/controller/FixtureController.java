package com.example.FootyFocus4.controller;


import com.example.FootyFocus4.entity.Fixture;
import com.example.FootyFocus4.service.FixtureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.*;
import java.util.List;

@CrossOrigin(origins = "https://footy-focus4.vercel.app")
@RestController
@RequestMapping("/v4/matches")
public class FixtureController {
    @Autowired
    private FixtureService fixtureService;

    @GetMapping("/{teamId}")
    public ResponseEntity<?> getUpcomingFixtures(@PathVariable Long teamId) {
        try {
            List<Fixture> fixtures = fixtureService.getUpcomingFixtures(teamId);
            return ResponseEntity.ok(fixtures);
        } catch (HttpClientErrorException e) {
            return switch (e.getStatusCode().value()) {
                case 400 -> ResponseEntity.badRequest().body("Bad request — invalid team ID: " + teamId);
                case 401 -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized — invalid or missing API token.");
                case 403 -> ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden — your plan may not include access to this team: " + teamId);
                case 404 -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("No fixtures found for team '" + teamId + "'.");
                case 429 -> ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit reached — too many requests to the football API.");
                default -> ResponseEntity.status(e.getStatusCode()).body("Client error: " + e.getMessage());
            };
        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Football API is currently unavailable. Please try again later.");
        } catch (ResourceAccessException e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Could not reach the football API — possible network or timeout issue.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
