import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEcashComponent } from './admin-ecash.component';

describe('AdminEcashComponent', () => {
  let component: AdminEcashComponent;
  let fixture: ComponentFixture<AdminEcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEcashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
