import { TestBed } from '@angular/core/testing';

import { CtcNarrative } from './ctc-narrative';

describe('CtcNarrative', () => {
  let service: CtcNarrative;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcNarrative);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
