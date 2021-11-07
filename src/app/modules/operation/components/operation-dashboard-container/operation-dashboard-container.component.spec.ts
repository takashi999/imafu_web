import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDashboardContainerComponent } from './operation-dashboard-container.component';

describe('OperationDashboardContainerComponent', () => {
  let component: OperationDashboardContainerComponent;
  let fixture: ComponentFixture<OperationDashboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationDashboardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
