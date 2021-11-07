import { TestBed } from '@angular/core/testing';

import { OperationTenantGroupService } from './operation-tenant-group.service';

describe('OperationTenantGroupService', () => {
  let service: OperationTenantGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationTenantGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
