import { TestBed } from '@angular/core/testing';

import { CtcUserAuth } from './ctc-user-auth';

describe('CtcUserAuth', () => {
  let service: CtcUserAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcUserAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
