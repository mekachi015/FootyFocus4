
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fixture } from '../../models/fixtures-model/fixture.model';
import { environment } from '../../enviroments/enviroment.prod';
@Injectable({
  providedIn: 'root',
})
export class FixturesService {
  private apiUrl = `${environment.apiUrl}/v4/matches`;

  constructor(private http: HttpClient) {}

  getFixtures(teamId: number): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(`${this.apiUrl}/${teamId}`);
  }
}
