import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantBasicEditComponent } from './tenant-basic-edit.component';

describe('TenantBasicEditComponent', () => {
  let component: TenantBasicEditComponent;
  let fixture: ComponentFixture<TenantBasicEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantBasicEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantBasicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
