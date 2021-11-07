import { TestBed } from '@angular/core/testing';

import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';

describe('StaffService', () => {
  let service: OperationStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
