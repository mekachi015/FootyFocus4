import { ChangeDetectorRef, Component } from '@angular/core';
import { PlayerSearch } from '../../models/playerSearch-model/playerSearch-model';
import { PlayerSearchService } from '../../services/playerSearch-service/player-search-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-search-component',
  imports: [FormsModule],
  templateUrl: './player-search-component.html',
  styleUrl: './player-search-component.scss',
})
export class PlayerSearchComponent {
  searchQuery: string = '';
  players: PlayerSearch[] = [];
  loading: boolean = false;
  error: string = '';

  selectedPlayer: any = null;

  // Function to open modal
  openPlayerDetails(player: any) {
    this.selectedPlayer = player;
  }

  // Function to close modal
  closeModal() {
    this.selectedPlayer = null;
  }

  constructor(
    private playerSearchService: PlayerSearchService,
    private cdr: ChangeDetectorRef,
  ) {}

  onSearch(): void {
    if (!this.searchQuery.trim()) return;
    this.loading = true;
    this.error = '';
    this.players = [];

    this.playerSearchService.searchPlayers(this.searchQuery).subscribe({
      next: (data) => {
        this.players = data;
        this.loading = false;
        this.cdr.markForCheck(); // Ensure view updates after data is set
        this.cdr.detectChanges(); // Force change detection to update the view immediately
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);
  }
}
