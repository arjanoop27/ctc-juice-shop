import { TestBed } from '@angular/core/testing';

import { CtcNotification } from './ctc-notification';

describe('CtcNotification', () => {
  let service: CtcNotification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcNotification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
