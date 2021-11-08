import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationUserCreateComponent } from './operation-user-create.component';

describe('OperationUserCreateComponent', () => {
  let component: OperationUserCreateComponent;
  let fixture: ComponentFixture<OperationUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationUserCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
