import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantOptionServiceService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get(`@te/option`);
  }

  modify(body: any) {
    return this.httpClient.patch(`@te/option`, body);
  }
}
