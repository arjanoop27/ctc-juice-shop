import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcSubmission } from './ctc-submission';

describe('CtcSubmission', () => {
  let component: CtcSubmission;
  let fixture: ComponentFixture<CtcSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
