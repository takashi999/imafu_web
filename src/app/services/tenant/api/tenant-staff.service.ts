import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantStaffService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/staffs`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/staffs`, body);
  }

  get(tenantUserId: number) {
    return this.httpClient.get<any>(`@te/staffs/${ tenantUserId }`);
  }

  modify(tenantUserId: number, body: any) {
    return this.httpClient.patch(`@te/staffs/${ tenantUserId }`, body);
  }

  delete(tenantUserId: number) {
    return this.httpClient.delete(`@te/staffs/${ tenantUserId }`);
  }
}
