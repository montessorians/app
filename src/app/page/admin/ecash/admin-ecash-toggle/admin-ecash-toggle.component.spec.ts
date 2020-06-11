import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEcashToggleComponent } from './admin-ecash-toggle.component';

describe('AdminEcashToggleComponent', () => {
  let component: AdminEcashToggleComponent;
  let fixture: ComponentFixture<AdminEcashToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEcashToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEcashToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
