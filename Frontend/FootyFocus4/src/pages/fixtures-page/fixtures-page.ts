import { ChangeDetectorRef, Component } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FixturesService } from '../../services/fixures-service/fixtures-service';
import { Fixture } from '../../models/fixtures-model/fixture.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fixtures-page',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './fixtures-page.html',
  styleUrls: ['./fixtures-page.scss']
})
export class FixturesPage {
  teams: { league: string; teamName: string; teamCode: number }[] = [
    // Premier League teams
    { league: 'Premier League', teamName: 'Manchester United', teamCode: 66 },
    { league: 'Premier League', teamName: 'Liverpool', teamCode: 64 },
    { league: 'Premier League', teamName: 'Chelsea', teamCode: 61 },
    { league: 'Premier League', teamName: 'Arsenal', teamCode: 57 },
    { league: 'Premier League', teamName: 'Manchester City', teamCode: 65 },
    //La Liga teams
    { league: 'La Liga', teamName: 'Real Madrid', teamCode: 86 },
    { league: 'La Liga', teamName: 'Barcelona', teamCode: 81 },
    { league: 'La Liga', teamName: 'Atletico Madrid', teamCode: 78 },
    { league: 'La Liga', teamName: 'Sevilla', teamCode: 559 },
    { league: 'La Liga', teamName: 'Real Sociedad', teamCode: 92 },
    // Bundesliga teams
    { league: 'Bundesliga', teamName: 'Bayern Munich', teamCode: 5 },
    { league: 'Bundesliga', teamName: 'Borussia Dortmund', teamCode: 4 },
    { league: 'Bundesliga', teamName: 'RB Leipzig', teamCode: 721 },
    { league: 'Bundesliga', teamName: 'Bayer Leverkusen', teamCode: 3 },
    { league: 'Bundesliga', teamName: 'Eintracht Frankfurt', teamCode: 19 },
    // Serie A teams
    { league: 'Serie A', teamName: 'Juventus', teamCode: 109 },
    { league: 'Serie A', teamName: 'Inter Milan', teamCode: 108 },
    { league: 'Serie A', teamName: 'AC Milan', teamCode: 98 },
    { league: 'Serie A', teamName: 'AS Roma', teamCode: 100 },
    { league: 'Serie A', teamName: 'SSC Napoli', teamCode: 113 },
    // Ligue 1 teams
    { league: 'Ligue 1', teamName: 'Paris Saint-Germain', teamCode: 524 },
    { league: 'Ligue 1', teamName: 'Olympique Lyonnais', teamCode: 516 }, 
    { league: 'Ligue 1', teamName: 'AS Monaco', teamCode: 548 },
    { league: 'Ligue 1', teamName: 'Olympique de Marseille', teamCode: 523 },
    { league: 'Ligue 1', teamName: 'LOSC Lille', teamCode: 521 },
    //Eredivisie teams
    { league: 'Eredivisie', teamName: 'Ajax', teamCode: 678 },
    { league: 'Eredivisie', teamName: 'PSV Eindhoven', teamCode: 674 },
    { league: 'Eredivisie', teamName: 'Feyenoord', teamCode: 675 },
    { league: 'Eredivisie', teamName: 'AZ Alkmaar', teamCode: 682 },
    { league: 'Eredivisie', teamName: 'FC Twente', teamCode: 666 },
  ];

  leagues: string[] = Array.from(new Set(this.teams.map(t => t.league)));
  filteredTeams: { league: string; teamName: string; teamCode: number }[] = [];
  selectedLeague: string | null = null;
  selectedTeam: { league: string; teamName: string; teamCode: number } | null = null;

  fixtures: Fixture[] = [];
  loading = false;
  error: string | null = null;

  constructor(private fixturesService: FixturesService, private cdr: ChangeDetectorRef) {}

  onLeagueChange() {
    if (this.selectedLeague) {
      this.filteredTeams = this.teams.filter(t => t.league === this.selectedLeague);
      this.selectedTeam = null;
    } else {
      this.filteredTeams = [];
      this.selectedTeam = null;
    }
  }


  onTeamChange() {
    // Only update filtered state, do not fetch fixtures here
    if (!this.selectedTeam) {
      this.fixtures = [];
    }
  }

  onSearch() {
    if (this.selectedTeam) {
      this.getFixtures(this.selectedTeam.teamCode);
    }
  }

  getFixtures(teamId: number) {
    this.loading = true;
    this.error = null;
    this.fixturesService.getFixtures(teamId).subscribe({
      next: (data) => {
        this.fixtures = data;
        this.loading = false;
        this.cdr.markForCheck(); // Ensure view updates after data is set
        this.cdr.detectChanges(); // Force change detection to update the view immediately
        console.log('Fetched fixtures:', data); // Log the fetched fixtures for debugging
      },
      error: (err) => {
        this.error = 'Could not load fixtures.';
        this.loading = false;
      }
    });
  }
}
