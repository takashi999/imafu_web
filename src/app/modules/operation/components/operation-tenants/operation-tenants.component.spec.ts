import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTenantsComponent } from './operation-tenants.component';

describe('OperationTenantsComponent', () => {
  let component: OperationTenantsComponent;
  let fixture: ComponentFixture<OperationTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationTenantsComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
