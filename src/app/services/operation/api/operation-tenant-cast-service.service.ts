import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModifyOperationTenantCastServiceTypeRequest } from 'src/app/services/operation/api/requests';
import { OperationTenantCastServiceType } from 'src/app/services/operation/api/responses';

@Injectable({
  providedIn: 'root',
})
export class OperationTenantCastServiceService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<OperationTenantCastServiceType[]>(`@op/tenant-cast-services`);
  }

  create(body: ModifyOperationTenantCastServiceTypeRequest) {
    return this.httpClient.post<OperationTenantCastServiceType[]>(`@op/tenant-cast-services`, body);
  }

  get(id: number) {
    return this.httpClient.get<OperationTenantCastServiceType>(`@op/tenant-cast-services/${ id }`);
  }

  modify(id: number, body: ModifyOperationTenantCastServiceTypeRequest) {
    return this.httpClient.patch<OperationTenantCastServiceType[]>(`@op/tenant-cast-services/${ id }`, body);
  }

  delete(id: number) {
    return this.httpClient.delete<OperationTenantCastServiceType[]>(`@op/tenant-cast-services/${ id }`);
  }
}
