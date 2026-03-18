import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcVanillaMission } from './ctc-vanilla-mission';

describe('CtcVanillaMission', () => {
  let component: CtcVanillaMission;
  let fixture: ComponentFixture<CtcVanillaMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcVanillaMission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcVanillaMission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
