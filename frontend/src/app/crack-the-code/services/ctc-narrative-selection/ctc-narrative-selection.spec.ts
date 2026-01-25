import { TestBed } from '@angular/core/testing';

import { CtcNarrativeSelection } from './ctc-narrative-selection';

describe('CtcNarrativeSelection', () => {
  let service: CtcNarrativeSelection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcNarrativeSelection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
