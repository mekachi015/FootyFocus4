import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopScorerPage } from './top-scorer-page';

describe('TopScorerPage', () => {
  let component: TopScorerPage;
  let fixture: ComponentFixture<TopScorerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopScorerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TopScorerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
