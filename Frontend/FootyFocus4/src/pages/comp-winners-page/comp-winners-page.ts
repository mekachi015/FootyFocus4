import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompWinners } from '../../models/compWinners-model/compWinners-model';
import { CompWinnersService } from '../../services/compWinners-service/comp-winners-service';

@Component({
  selector: 'app-comp-winners-page',
  imports: [FormsModule],
  templateUrl: './comp-winners-page.html',
  styleUrl: './comp-winners-page.scss',
})
export class CompWinnersPage {
    winners: CompWinners[] = [];
  isLoading = false;
  errorMessage = '';

  selectedLeague = 'PL';

  leagueCodes: { code: string; name: string }[] = [
    { code: 'PL',  name: 'Premier League' },
    { code: 'BL1', name: 'Bundesliga' },
    { code: 'SA',  name: 'Serie A' },
    { code: 'FL1', name: 'Ligue 1' },
    { code: 'PD',  name: 'La Liga' },
    { code: 'DED', name: 'Eredivisie' },
  ];

  constructor(
    private compWinnersService: CompWinnersService,
    private cdr: ChangeDetectorRef
  ) {}

  get selectedLeagueName(): string {
    return this.leagueCodes.find(l => l.code === this.selectedLeague)?.name ?? '';
  }

  // Extract the season year from startDate e.g. "2023-08-11" → 2023
  getSeasonLabel(winner: CompWinners): string {
    const startYear = winner.startDate?.substring(0, 4);
    const endYear = winner.endDate?.substring(2, 4);
    return `${startYear}/${endYear}`;
  }

  fetchWinners(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.winners = [];

    this.compWinnersService.fetchWinners(this.selectedLeague).subscribe({
      next: (data) => {
        this.winners = data;
        this.isLoading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }
}
