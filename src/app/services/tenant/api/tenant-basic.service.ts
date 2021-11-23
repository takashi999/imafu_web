import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModifyTenantByTenantRequest } from 'src/app/services/tenant/api/requests';
import { Tenant } from 'src/app/services/tenant/api/responses';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TenantBasicService {

  tenantId$ = new BehaviorSubject<null | number>(null);

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<Tenant>('@te/basic')
      .pipe(
        tap(x => this.tenantId$.next(x.id)),
      );
  }

  modify(body: ModifyTenantByTenantRequest) {
    return this.httpClient.patch<Tenant>('@te/basic', body).pipe(
      tap(x => this.tenantId$.next(x.id)),
    );
  }
}
