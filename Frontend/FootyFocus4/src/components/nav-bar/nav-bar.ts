import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {

  isMenuOpen: boolean = false;

  navLinks = [
    {label: 'Home', path: '/'},
    { label: 'Standings', path: '/league-standings'},
    { label: 'Top Scorers', path: '/top-scorer'},
    { label: 'Fixtures', path: '/fixtures'},
    { label: 'Winners', path: '/comp-winners'},
    { label: 'Players', path: '/player-search' },
  ];
  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

}

