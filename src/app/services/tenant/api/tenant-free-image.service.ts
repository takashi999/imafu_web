import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantFreeImageService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/free-images`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/free-images`, body);
  }

  get(tenantFreeImageId: number) {
    return this.httpClient.get(`@te/free-images/${ tenantFreeImageId }`);
  }

  modify(tenantFreeImageId: number, body: any) {
    return this.httpClient.patch(`@te/free-images/${ tenantFreeImageId }`, body);
  }

  delete(tenantFreeImageId: number) {
    return this.httpClient.delete(`@te/free-images/${ tenantFreeImageId }`);
  }
}
