import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcHomeVanilla } from './ctc-home-vanilla';

describe('CtcHomeVanilla', () => {
  let component: CtcHomeVanilla;
  let fixture: ComponentFixture<CtcHomeVanilla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcHomeVanilla]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcHomeVanilla);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
