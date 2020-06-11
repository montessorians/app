import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentAddComponent } from './admin-student-add.component';

describe('AdminStudentAddComponent', () => {
  let component: AdminStudentAddComponent;
  let fixture: ComponentFixture<AdminStudentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
