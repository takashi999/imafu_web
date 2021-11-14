import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantRankingService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/rankings`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/rankings`, body);
  }

  get(tenantRankingId: number) {
    return this.httpClient.get(`@te/rankings/${ tenantRankingId }`);
  }

  modify(tenantRankingId: number, body: any) {
    return this.httpClient.patch(`@te/rankings/${ tenantRankingId }`, body);
  }

  delete(tenantRankingId: number) {
    return this.httpClient.delete(`@te/rankings/${ tenantRankingId }`);
  }
}
