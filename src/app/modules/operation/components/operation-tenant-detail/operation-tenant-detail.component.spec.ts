import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTenantDetailComponent } from './operation-tenant-detail.component';

describe('OperationTenantDetailComponent', () => {
  let component: OperationTenantDetailComponent;
  let fixture: ComponentFixture<OperationTenantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationTenantDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTenantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
