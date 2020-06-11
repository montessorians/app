import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentLinkAccountComponent } from './admin-student-link-account.component';

describe('AdminStudentLinkAccountComponent', () => {
  let component: AdminStudentLinkAccountComponent;
  let fixture: ComponentFixture<AdminStudentLinkAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentLinkAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentLinkAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
