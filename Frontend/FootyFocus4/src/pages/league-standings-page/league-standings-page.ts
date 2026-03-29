import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { LeagueStandings } from '../../models/league-standings-models';
import { LeagueStandingService } from '../../services/leagueStandings-service/league-standing-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-league-standings-page',
  imports: [ FormsModule],
  templateUrl: './league-standings-page.html',
  styleUrls: ['./league-standings-page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LeagueStandingsPage implements OnInit {
  standings: LeagueStandings[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  selectedLeague = 'PL';
  selectedSeason = 2023;

  leagueCodes: { code: string; name: string }[] = [
    { code: 'PL', name: 'Premier League' },
    { code: 'BL1', name: 'Bundesliga' },
    { code: 'SA', name: 'Serie A' },
    { code: 'FL1', name: 'Ligue 1' },
    { code: 'PD', name: 'La Liga' },
    { code: 'DED', name: 'Eredivisie' },
  ];

  seasonYears: number[] = [2023, 2024];

  private instanceId = Math.random();

  constructor(
    private leagueStandingService: LeagueStandingService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Do not fetch standings on init
  }

  fetchStandings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.standings = [];

    
    // Log the selected league and season
    console.log('Selected League:', this.selectedLeague, 'Selected Season:', this.selectedSeason);

    // Ensure league code is sent as path variable
    this.leagueStandingService.getStandings(this.selectedLeague, this.selectedSeason).subscribe({
      next: (data) => {
        this.standings = data;
        this.isLoading = false;
        this.cdr.markForCheck(); // Ensure view updates after data is set
        this.cdr.detectChanges(); // Force change detection to update the view immediately
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  get selectedLeagueName(): string {
    return this.leagueCodes.find((l) => l.code === this.selectedLeague)?.name ?? '';
  }
}
