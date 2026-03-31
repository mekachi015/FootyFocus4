import { Routes } from '@angular/router';
import { LeagueStandingsPage } from '../pages/league-standings-page/league-standings-page';
// Update the import path to the correct file location and name
import { TopScorerPage } from '../pages/top-scorer-page/top-scorer-page';
import { CompWinnersPage } from '../pages/comp-winners-page/comp-winners-page';
import { FixturesPage } from '../pages/fixtures-page/fixtures-page';
import { HomePage } from '../pages/home-page/home-page';
import { NavBar } from '../components/nav-bar/nav-bar';
import { PlayerSearchComponent } from '../pages/player-search-component/player-search-component';


export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'league-standings', component: LeagueStandingsPage },
    { path: 'top-scorer', component: TopScorerPage },
    { path: 'comp-winners', component: CompWinnersPage },
    { path: 'fixtures', component: FixturesPage },
    { path: 'navBar', component: NavBar },
    { path: 'player-search', component: PlayerSearchComponent },
];
