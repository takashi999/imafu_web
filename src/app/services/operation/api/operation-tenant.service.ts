import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTenantRequest, ModifyTenantRequest } from 'src/app/services/operation/api/requests';
import { OperationTenant } from 'src/app/services/operation/api/responses';

@Injectable({
    providedIn: 'root',
})
export class OperationTenantService {

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    list() {
        return this.httpClient.get<OperationTenant[]>('@op/tenants');
    }

    get(id: number) {
        return this.httpClient.get<OperationTenant>('@op/tenants/' + id);
    }

    create(body: CreateTenantRequest) {
        return this.httpClient.post<OperationTenant[]>('@op/tenants', body);
    }

    modify(id: number, body: ModifyTenantRequest) {
        return this.httpClient.patch<OperationTenant[]>('@op/tenants/' + id, body);
    }

    delete(id: number) {
        return this.httpClient.delete<OperationTenant[]>('@op/tenants/' + id);
    }
}
