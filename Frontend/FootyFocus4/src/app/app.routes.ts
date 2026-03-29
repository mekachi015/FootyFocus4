import { Routes } from '@angular/router';
import { LeagueStandingsPage } from '../pages/league-standings-page/league-standings-page';
// Update the import path to the correct file location and name
import { TopScorerPage } from '../pages/top-scorer-page/top-scorer-page';


export const routes: Routes = [
    { path: 'league-standings', component: LeagueStandingsPage },
    { path: 'top-scorer', component: TopScorerPage}
];
