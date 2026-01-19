import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtcApp } from './ctc-app';

describe('CtcApp', () => {
  let component: CtcApp;
  let fixture: ComponentFixture<CtcApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtcApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
