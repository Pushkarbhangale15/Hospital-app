import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientRecordsComponent } from './recipient-records.component';

describe('RecipientRecordsComponent', () => {
  let component: RecipientRecordsComponent;
  let fixture: ComponentFixture<RecipientRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipientRecordsComponent]
    });
    fixture = TestBed.createComponent(RecipientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
