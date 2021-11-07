import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationAppContainerComponent } from './operation-app-container.component';

describe('OperationAppContainerComponent', () => {
  let component: OperationAppContainerComponent;
  let fixture: ComponentFixture<OperationAppContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationAppContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationAppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
