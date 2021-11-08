import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationTenantGroup } from 'src/app/services/operation/api/responses';

@Injectable({
  providedIn: 'root',
})
export class OperationTenantGroupService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<OperationTenantGroup[]>('@op/tenant-groups');
  }
}
