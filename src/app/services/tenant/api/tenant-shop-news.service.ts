import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantShopNews } from 'src/app/services/tenant/api/responses';
import { CreateTenantShopNewsRequest, ModifyTenantShopNewsRequest } from 'src/app/services/tenant/api/requests';

@Injectable({
  providedIn: 'root',
})
export class TenantShopNewsService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<TenantShopNews[]>('@te/shop-news');
  }

  create(body: CreateTenantShopNewsRequest) {
    return this.httpClient.post<TenantShopNews[]>('@te/shop-news', body);
  }

  get(id: number) {
    return this.httpClient.get<TenantShopNews>(`@te/shop-news/${ id }`);
  }

  modify(id: number, body: ModifyTenantShopNewsRequest) {
    return this.httpClient.patch<TenantShopNews[]>(`@te/shop-news/${ id }`, body);
  }

  delete(id: number) {
    return this.httpClient.delete<TenantShopNews[]>(`@te/shop-news/${ id }`);
  }
}
