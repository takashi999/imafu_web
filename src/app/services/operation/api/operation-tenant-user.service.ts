import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateOperationTenantUserRequest,
  CreateTenantRequest, ModifyOperationTenantUserRequest,
  ModifyTenantRequest,
} from 'src/app/services/operation/api/requests';
import { TenantUser } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class OperationTenantUserService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list(tenantId: number) {
    return this.httpClient.get<TenantUser[]>('@op/tenants/' + tenantId + '/users');
  }

  get(tenantId: number, id: number) {
    return this.httpClient.get<TenantUser>('@op/tenants/' + tenantId + '/users/' + id);
  }

  create(tenantId: number, body: CreateOperationTenantUserRequest) {
    return this.httpClient.post<TenantUser[]>('@op/tenants/' + tenantId + '/users', body);
  }

  modify(tenantId: number, id: number, body: ModifyOperationTenantUserRequest) {
    return this.httpClient.patch<TenantUser[]>('@op/tenants/' + tenantId + '/users/' + id, body);
  }

  delete(tenantId: number, id: number) {
    return this.httpClient.delete<TenantUser[]>('@op/tenants/' + tenantId + '/users/' + id);
  }
}
