import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcHomeNarrative } from './ctc-home-narrative';

describe('CtcHomeNarrative', () => {
  let component: CtcHomeNarrative;
  let fixture: ComponentFixture<CtcHomeNarrative>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcHomeNarrative]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcHomeNarrative);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
