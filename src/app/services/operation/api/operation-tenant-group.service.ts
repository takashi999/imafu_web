import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationTenantGroup } from 'src/app/services/operation/api/responses';
import { CreateTenantGroupRequest } from 'src/app/services/operation/api/requests';

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

  create(body: CreateTenantGroupRequest) {
    return this.httpClient.post<OperationTenantGroup[]>('@op/tenant-groups', body);
  }

  get(id: number) {
    return this.httpClient.get<OperationTenantGroup>(`@op/tenant-groups/${ id }`);
  }

  modify(id: number, body: CreateTenantGroupRequest) {
    return this.httpClient.patch<OperationTenantGroup[]>(`@op/tenant-groups/${ id }`, body);
  }

  delete(id: number) {
    return this.httpClient.delete<OperationTenantGroup[]>(`@op/tenant-groups/${ id }`);
  }

  add(id: number, tenantId: number) {
    return this.httpClient.delete<OperationTenantGroup>(`@op/tenant-groups/${ id }/${ tenantId }`);
  }

  deleteTenant(id: number, tenantId: number) {
    return this.httpClient.delete<OperationTenantGroup>(`@op/tenant-groups/${ id }/${ tenantId }`);
  }
}
