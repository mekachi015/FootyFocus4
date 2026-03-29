import { TestBed } from '@angular/core/testing';

import { CompWinnersService } from './comp-winners-service';

describe('CompWinnersService', () => {
  let service: CompWinnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompWinnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
