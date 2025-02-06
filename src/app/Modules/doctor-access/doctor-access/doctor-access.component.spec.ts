import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAccessComponent } from './doctor-access.component';

describe('DoctorAccessComponent', () => {
  let component: DoctorAccessComponent;
  let fixture: ComponentFixture<DoctorAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAccessComponent]
    });
    fixture = TestBed.createComponent(DoctorAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
