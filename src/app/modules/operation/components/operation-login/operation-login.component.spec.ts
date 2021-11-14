import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationLoginComponent } from './operation-login.component';

describe('OperationLoginComponent', () => {
  let component: OperationLoginComponent;
  let fixture: ComponentFixture<OperationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationLoginComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
