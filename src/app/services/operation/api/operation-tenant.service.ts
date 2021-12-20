import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTenantRequest } from 'src/app/services/operation/api/requests';
import { OperationTenant } from 'src/app/services/operation/api/responses';
import { FormDataService } from 'src/app/services/form-data.service';
import { tap } from 'rxjs/operators';
import { TokenService } from 'src/app/services/token.service';
import { TenantAuthService } from 'src/app/services/tenant/api/tenant-auth.service';

@Injectable({
  providedIn: 'root',
})
export class OperationTenantService {

  constructor(
    private httpClient: HttpClient,
    private formDataService: FormDataService,
    private tokenService: TokenService,
    private tenantAuthService: TenantAuthService,
  ) {
  }

  list() {
    return this.httpClient.get<OperationTenant[]>('@op/tenants');
  }

  get(id: number) {
    return this.httpClient.get<OperationTenant>('@op/tenants/' + id);
  }

  create(body: CreateTenantRequest) {
    return this.httpClient.post<OperationTenant[]>('@op/tenants', this.formDataService.getFormData(body));
  }

  modify(id: number, body: CreateTenantRequest) {
    return this.httpClient.patch<OperationTenant[]>('@op/tenants/' + id, this.formDataService.getFormData(body));
  }

  delete(id: number) {
    return this.httpClient.delete<OperationTenant[]>('@op/tenants/' + id);
  }

  loginAsOperator(id: number) {
    return this.httpClient.patch(`@op/tenants-login-as-operator/${ id }`, {}, {
      responseType: 'text',
    }).pipe(
      tap(x => {
        this.tokenService.setTenantToken(x);
        this.tenantAuthService.loginNotifier$.next();
      }),
    );
  }
}
