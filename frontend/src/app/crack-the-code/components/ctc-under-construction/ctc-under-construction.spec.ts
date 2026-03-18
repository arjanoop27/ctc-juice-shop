import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcUnderConstruction } from './ctc-under-construction';

describe('CtcUnderConstruction', () => {
  let component: CtcUnderConstruction;
  let fixture: ComponentFixture<CtcUnderConstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcUnderConstruction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcUnderConstruction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
