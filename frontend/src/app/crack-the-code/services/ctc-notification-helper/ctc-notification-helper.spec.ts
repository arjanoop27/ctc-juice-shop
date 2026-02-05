import { TestBed } from '@angular/core/testing';

import { CtcNotificationHelper } from './ctc-notification-helper';

describe('CtcNotificationHelper', () => {
  let service: CtcNotificationHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtcNotificationHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
