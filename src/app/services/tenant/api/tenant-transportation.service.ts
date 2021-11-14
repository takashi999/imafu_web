import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantTransportationService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get(`@te/transportation`);
  }

  modify(body: any) {
    return this.httpClient.patch(`@te/transportation`, body);
  }
}
