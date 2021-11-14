import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantFreeBlockService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/free-blocks`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/free-blocks`, body);
  }

  get(tenantFreeBlockId: number) {
    return this.httpClient.get(`@te/free-blocks/${ tenantFreeBlockId }`);
  }

  modify(tenantFreeBlockId: number, body: any) {
    return this.httpClient.patch(`@te/free-blocks/${ tenantFreeBlockId }`, body);
  }

  delete(tenantFreeBlockId: number) {
    return this.httpClient.delete(`@te/free-blocks/${ tenantFreeBlockId }`);
  }

  changeSort(body: any) {
    return this.httpClient.patch(`@te/free-blocks-sort`, body);
  }
}
