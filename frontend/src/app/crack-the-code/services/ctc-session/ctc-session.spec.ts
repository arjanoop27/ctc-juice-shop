import { TestBed } from '@angular/core/testing';

import { CtcSession } from './ctc-session';

describe('CtcSession', () => {
  let service: CtcSession;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcSession);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
