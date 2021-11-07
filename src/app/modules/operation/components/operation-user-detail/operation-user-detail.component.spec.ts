import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationUserDetailComponent } from './operation-user-detail.component';

describe('OperationUserDetailComponent', () => {
  let component: OperationUserDetailComponent;
  let fixture: ComponentFixture<OperationUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
