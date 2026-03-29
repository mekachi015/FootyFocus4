
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fixture } from '../../models/fixtures-model/fixture.model';

@Injectable({
  providedIn: 'root',
})
export class FixturesService {
  private apiUrl = 'http://localhost:8080/v4/matches';

  constructor(private http: HttpClient) {}

  getFixtures(teamId: number): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(`${this.apiUrl}/${teamId}`);
  }
}
