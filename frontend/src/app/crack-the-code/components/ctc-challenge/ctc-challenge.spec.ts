import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcChallenge } from './ctc-challenge';

describe('CtcChallenge', () => {
  let component: CtcChallenge;
  let fixture: ComponentFixture<CtcChallenge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcChallenge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcChallenge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
