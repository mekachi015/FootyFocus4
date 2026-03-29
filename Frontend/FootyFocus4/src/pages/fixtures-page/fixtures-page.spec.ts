import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturesPage } from './fixtures-page';

describe('FixturesPage', () => {
  let component: FixturesPage;
  let fixture: ComponentFixture<FixturesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixturesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FixturesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
