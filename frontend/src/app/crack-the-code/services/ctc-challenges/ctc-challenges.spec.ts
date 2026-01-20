import { TestBed } from '@angular/core/testing';

import { CtcChallenges } from './ctc-challenges';

describe('CtcChallenges', () => {
  let service: CtcChallenges;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcChallenges);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
