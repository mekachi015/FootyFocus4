import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompWinnersPage } from './comp-winners-page';

describe('CompWinnersPage', () => {
  let component: CompWinnersPage;
  let fixture: ComponentFixture<CompWinnersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompWinnersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CompWinnersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
