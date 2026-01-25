import { TestBed } from '@angular/core/testing';

import { CtcCurrentSelection } from './ctc-current-selection';

describe('CtcCurrentSelection', () => {
  let service: CtcCurrentSelection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcCurrentSelection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
