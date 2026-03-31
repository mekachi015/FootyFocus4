import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueStandingsPage } from './league-standings-page';

describe('LeagueStandingsPage', () => {
  let component: LeagueStandingsPage;
  let fixture: ComponentFixture<LeagueStandingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueStandingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueStandingsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
