import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTenantCreateComponent } from './operation-tenant-create.component';

describe('OperationTenantCreateComponent', () => {
  let component: OperationTenantCreateComponent;
  let fixture: ComponentFixture<OperationTenantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationTenantCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTenantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
