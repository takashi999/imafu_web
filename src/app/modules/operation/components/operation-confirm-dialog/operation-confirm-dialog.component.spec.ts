import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationConfirmDialogComponent } from './operation-confirm-dialog.component';

describe('OperationConfirmDialogComponent', () => {
  let component: OperationConfirmDialogComponent;
  let fixture: ComponentFixture<OperationConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
