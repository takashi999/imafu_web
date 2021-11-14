import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTenantGroupsComponent } from './operation-tenant-groups.component';

describe('OperationTenantGroupsComponent', () => {
  let component: OperationTenantGroupsComponent;
  let fixture: ComponentFixture<OperationTenantGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationTenantGroupsComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTenantGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
