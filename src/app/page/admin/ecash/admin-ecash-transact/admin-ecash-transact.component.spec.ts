import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEcashTransactComponent } from './admin-ecash-transact.component';

describe('AdminEcashTransactComponent', () => {
  let component: AdminEcashTransactComponent;
  let fixture: ComponentFixture<AdminEcashTransactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEcashTransactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEcashTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
