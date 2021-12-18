import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantCast } from 'src/app/services/tenant/api/responses';
import { TenantCastRecommendRequest } from 'src/app/services/tenant/api/requests';

@Injectable({
  providedIn: 'root',
})
export class TenantCastService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<TenantCast[]>(`@te/casts`);
  }

  create(body: any) {
    return this.httpClient.post<TenantCast[]>(`@te/casts`, body);
  }

  get(tenantCastId: number) {
    return this.httpClient.get<TenantCast>(`@te/casts/${ tenantCastId }`);
  }

  modify(tenantCastId: number, body: any) {
    return this.httpClient.patch<TenantCast[]>(`@te/casts/${ tenantCastId }`, body);
  }

  delete(tenantCastId: number) {
    return this.httpClient.delete<TenantCast[]>(`@te/casts/${ tenantCastId }`);
  }

  changeSort(body: any) {
    return this.httpClient.patch<TenantCast[]>(`@te/casts-sort`, body);
  }

  recommend(tenantCastId: number, body: TenantCastRecommendRequest) {
    return this.httpClient.patch<TenantCast[]>(`@te/casts-recommend/${ tenantCastId }`, body);
  }
}
