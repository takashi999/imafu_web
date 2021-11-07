import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationUsersComponent } from './operation-users.component';

describe('OperationUsersComponent', () => {
  let component: OperationUsersComponent;
  let fixture: ComponentFixture<OperationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
