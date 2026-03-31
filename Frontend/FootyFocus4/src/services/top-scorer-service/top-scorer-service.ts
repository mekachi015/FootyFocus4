import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DetailedPlayer } from '../../models/detailed-player-model/detailed-player-model';
import { TopScorer } from '../../models/top-scorere-model/topscorer-model';
import { environment } from '../../enviroments/enviroment.prod';
@Injectable({
  providedIn: 'root',
})
export class TopScorerService {
  private readonly BASE_URL = `${environment.apiUrl}/v4/competitions`;
  private readonly PLAYER_URL = `${environment.apiUrl}/v4/persons`;

  constructor(private http: HttpClient) {}

  fetchTopScorers(leagueCode: string, season: number): Observable<TopScorer[]> {
    const params = new HttpParams().set('season', season.toString());

    return this.http
      .get<TopScorer[]>(`${this.BASE_URL}/${leagueCode}/scorers`, { params })
      .pipe(catchError(this.handleError));
  }

  fetchPlayerDetails(id: number): Observable<DetailedPlayer> {
    return this.http
      .get<DetailedPlayer>(`${this.PLAYER_URL}/${id}`)
      .pipe(catchError(this.handleError));
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
        errorMessage = 'No data found for the provided parameters.';
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
