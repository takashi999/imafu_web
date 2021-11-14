import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDashboardContainerComponent } from './tenant-dashboard-container.component';

describe('TenantDashboardContainerComponent', () => {
  let component: TenantDashboardContainerComponent;
  let fixture: ComponentFixture<TenantDashboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantDashboardContainerComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
