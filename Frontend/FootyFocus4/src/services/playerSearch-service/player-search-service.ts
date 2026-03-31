import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerSearch } from '../../models/playerSearch-model/playerSearch-model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment.prod';
@Injectable({
  providedIn: 'root',
})
export class PlayerSearchService {
  private readonly API_URL = `${environment.apiUrl}/api/players/search`;

  constructor(private http: HttpClient) {}

  searchPlayers(name: string): Observable<PlayerSearch[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<PlayerSearch[]>(this.API_URL, { params }).pipe(
      catchError(err => {
        const message = err.error ?? 'An unexpected error occurred.';
        return throwError(() => new Error(message));
      })
    );
  }
}
