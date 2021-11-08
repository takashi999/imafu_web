import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModifyTenantByTenantRequest } from 'src/app/services/tenant/api/requests';
import { Tenant } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantBasicService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<Tenant>('@te/basic');
  }

  modify(body: ModifyTenantByTenantRequest) {
    return this.httpClient.patch<Tenant>('@te/basic', body);
  }
}
