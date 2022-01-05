import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModifyTenantEventNews } from 'src/app/services/tenant/api/requests';
import { TenantEventNews } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantEventNewsService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<TenantEventNews>('@te/event-news');
  }

  modify(body: ModifyTenantEventNews) {
    return this.httpClient.patch<TenantEventNews>('@te/event-news', body);
  }
}
