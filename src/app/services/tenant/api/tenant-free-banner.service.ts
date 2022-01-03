import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantFreeBanner } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantFreeBannerService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<TenantFreeBanner[]>(`@te/free-banners`);
  }

  create(body: any) {
    return this.httpClient.post<TenantFreeBanner[]>(`@te/free-banners`, body);
  }

  get(tenantFreeBannerId: number) {
    return this.httpClient.get<TenantFreeBanner>(`@te/free-banners/${ tenantFreeBannerId }`);
  }

  modify(tenantFreeBannerId: number, body: any) {
    return this.httpClient.patch<TenantFreeBanner[]>(`@te/free-banners/${ tenantFreeBannerId }`, body);
  }

  delete(tenantFreeBannerId: number) {
    return this.httpClient.delete<TenantFreeBanner[]>(`@te/free-banners/${ tenantFreeBannerId }`);
  }

  changeSort(body: any) {
    return this.httpClient.patch<TenantFreeBanner[]>(`@te/free-banners-sort`, body);
  }
}
