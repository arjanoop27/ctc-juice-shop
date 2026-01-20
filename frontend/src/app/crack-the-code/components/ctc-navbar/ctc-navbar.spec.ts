import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcNavbar } from './ctc-navbar';

describe('CtcNavbar', () => {
  let component: CtcNavbar;
  let fixture: ComponentFixture<CtcNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
