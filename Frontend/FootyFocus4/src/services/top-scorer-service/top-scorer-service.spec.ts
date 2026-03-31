import { TestBed } from '@angular/core/testing';

import { TopScorerService } from './top-scorer-service';

describe('TopScorerService', () => {
  let service: TopScorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopScorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
