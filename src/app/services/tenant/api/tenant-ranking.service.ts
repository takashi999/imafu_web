import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantRanking } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantRankingService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<TenantRanking[]>(`@te/rankings`);
  }

  create(body: any) {
    return this.httpClient.post<TenantRanking[]>(`@te/rankings`, body);
  }

  get(tenantRankingId: number) {
    return this.httpClient.get<TenantRanking>(`@te/rankings/${ tenantRankingId }`);
  }

  modify(tenantRankingId: number, body: any) {
    return this.httpClient.patch<TenantRanking[]>(`@te/rankings/${ tenantRankingId }`, body);
  }

  delete(tenantRankingId: number) {
    return this.httpClient.delete<TenantRanking[]>(`@te/rankings/${ tenantRankingId }`);
  }
}
