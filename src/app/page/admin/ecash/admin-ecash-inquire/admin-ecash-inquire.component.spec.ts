import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEcashInquireComponent } from './admin-ecash-inquire.component';

describe('AdminEcashInquireComponent', () => {
  let component: AdminEcashInquireComponent;
  let fixture: ComponentFixture<AdminEcashInquireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEcashInquireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEcashInquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
