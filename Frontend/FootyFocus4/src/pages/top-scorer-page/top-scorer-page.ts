import { ChangeDetectorRef, Component } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { TopScorerService } from '../../services/top-scorer-service/top-scorer-service';
import { DetailedPlayer } from '../../models/detailed-player-model/detailed-player-model';
import { TopScorer } from '../../models/top-scorere-model/topscorer-model';

@Component({
  selector: 'app-top-scorer-page',
  imports: [FormsModule],
  templateUrl: './top-scorer-page.html',
  styleUrl: './top-scorer-page.scss',
})
export class TopScorerPage {

  topScorers: TopScorer[] = [];
  selectedPlayer: DetailedPlayer | null = null;
  isLoading: boolean = false;
  isLoadingPlayer: boolean = false;
  errorMessage: string = '';

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

  constructor(private topScorerService: TopScorerService, private cdr: ChangeDetectorRef) {}

  get selectedLeagueName(): string {
    return this.leagueCodes.find(l => l.code === this.selectedLeague)?.name ?? '';
  }

  fetchTopScorers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.topScorers = [];
    this.selectedPlayer = null;

    this.topScorerService.fetchTopScorers(this.selectedLeague, this.selectedSeason).subscribe({
      next: (data) => {
        this.topScorers = data;
        this.isLoading = false;
        this.cdr.markForCheck(); // Ensure view updates after data is set
        this.cdr.detectChanges(); // Force change detection to update the view immediately
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  onPlayerClick(id: number): void {
    this.isLoadingPlayer = true;
    this.selectedPlayer = null;

    this.topScorerService.fetchPlayerDetails(id).subscribe({
      next: (player) => {
        this.selectedPlayer = player;
        this.isLoadingPlayer = false;
        this.cdr.markForCheck(); // Ensure view updates after data is set
        this.cdr.detectChanges(); // Force change detection to update the view immediately
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoadingPlayer = false;
      }
    });
  }

  closePlayer(): void {
    this.selectedPlayer = null;
  }

}
