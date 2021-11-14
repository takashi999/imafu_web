import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantFreeGalleryService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/free-galleries`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/free-galleries`, body);
  }

  get(tenantFreeGalleryId: number) {
    return this.httpClient.get(`@te/free-galleries/${ tenantFreeGalleryId }`);
  }

  modify(tenantFreeGalleryId: number, body: any) {
    return this.httpClient.patch(`@te/free-galleries/${ tenantFreeGalleryId }`, body);
  }

  delete(tenantFreeGalleryId: number) {
    return this.httpClient.delete(`@te/free-galleries/${ tenantFreeGalleryId }`);
  }

  changeSort(body: any) {
    return this.httpClient.patch(`@te/free-galleries-sort`, body);
  }
}
