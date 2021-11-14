import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantFreeBannerService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/free-banners`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/free-banners`, body);
  }

  get(tenantFreeBannerId: number) {
    return this.httpClient.get(`@te/free-banners/${ tenantFreeBannerId }`);
  }

  modify(tenantFreeBannerId: number, body: any) {
    return this.httpClient.patch(`@te/free-banners/${ tenantFreeBannerId }`, body);
  }

  delete(tenantFreeBannerId: number) {
    return this.httpClient.delete(`@te/free-banners/${ tenantFreeBannerId }`);
  }

  changeSort(body: any) {
    return this.httpClient.patch(`@te/free-banners-sort`, body);
  }
}
