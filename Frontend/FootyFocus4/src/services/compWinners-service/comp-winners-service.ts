import { Injectable } from '@angular/core';
import { CompWinners } from '../../models/compWinners-model/compWinners-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompWinnersService {
    private readonly BASE_URL = 'http://localhost:8080/v4/competitions';

  constructor(private http: HttpClient) {}

  fetchWinners(leagueCode: string): Observable<CompWinners[]> {
    return this.http
      .get<CompWinners[]>(`${this.BASE_URL}/${leagueCode}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred.';

    switch (error.status) {
      case 400:
        errorMessage = 'Bad request — invalid league code.';
        break;
      case 401:
        errorMessage = 'Unauthorized — invalid or missing API token.';
        break;
      case 403:
        errorMessage = 'Forbidden — your plan may not include access to this league.';
        break;
      case 404:
        errorMessage = 'No competition found for the selected league.';
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
