import { TestBed } from '@angular/core/testing';

import { OperationTenantService } from './operation-tenant.service';

describe('OperationTenantService', () => {
  let service: OperationTenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationTenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
