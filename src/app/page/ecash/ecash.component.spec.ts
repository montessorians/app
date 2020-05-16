import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcashComponent } from './ecash.component';

describe('EcashComponent', () => {
  let component: EcashComponent;
  let fixture: ComponentFixture<EcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
