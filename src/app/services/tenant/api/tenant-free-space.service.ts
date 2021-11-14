import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantFreeSpaceService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/free-spaces`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/free-spaces`, body);
  }

  get(tenantFreeSpaceId: number) {
    return this.httpClient.get(`@te/free-spaces/${ tenantFreeSpaceId }`);
  }

  modify(tenantFreeSpaceId: number, body: any) {
    return this.httpClient.patch(`@te/free-spaces/${ tenantFreeSpaceId }`, body);
  }

  delete(tenantFreeSpaceId: number) {
    return this.httpClient.delete(`@te/free-spaces/${ tenantFreeSpaceId }`);
  }

  changeSort(body: any) {
    return this.httpClient.patch(`@te/free-spaces-sort`, body);
  }
}
