import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientAccessComponent } from './recipient-access.component';

describe('RecipientAccessComponent', () => {
  let component: RecipientAccessComponent;
  let fixture: ComponentFixture<RecipientAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipientAccessComponent]
    });
    fixture = TestBed.createComponent(RecipientAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
