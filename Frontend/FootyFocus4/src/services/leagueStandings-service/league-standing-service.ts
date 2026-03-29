import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { LeagueStandings } from '../../models/league-standings-models';

@Injectable({
  providedIn: 'root',
})
export class LeagueStandingService {
   private readonly BASE_URL = 'http://localhost:8080/v4/competitions';

  constructor(private http: HttpClient) {}

  getStandings(leagueCode: string, season: number): Observable<LeagueStandings[]> {
    const params = new HttpParams().set('season', season.toString());

    return this.http.get<LeagueStandings[]>(
      `${this.BASE_URL}/${leagueCode}/standings`, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred.';

    switch (error.status) {
      case 400:
        errorMessage = 'Bad request — invalid league code or season.';
        break;
      case 401:
        errorMessage = 'Unauthorized — invalid or missing API token.';
        break;
      case 403:
        errorMessage = 'Forbidden — your plan may not include access to this league.';
        break;
      case 404:
        errorMessage = 'No standings found for the provided league and season.';
        break;
      case 429:
        errorMessage = 'Rate limit reached — please try again later.';
        break;
      case 502:
        errorMessage = 'Football API is currently unavailable.';
        break;
      case 503:
        errorMessage = 'Could not reach the football API — network issue.';
        break;
      default:
        errorMessage = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
