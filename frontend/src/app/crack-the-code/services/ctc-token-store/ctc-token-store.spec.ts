import { TestBed } from '@angular/core/testing';

import { CtcTokenStore } from './ctc-token-store';

describe('CtcTokenStore', () => {
  let service: CtcTokenStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcTokenStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
