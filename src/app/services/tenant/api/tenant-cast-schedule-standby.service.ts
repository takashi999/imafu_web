import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantCastScheduleStandbyListResponse } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantCastScheduleStandbyService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<TenantCastScheduleStandbyListResponse>(`@te/schedules-standby`);
  }

  modify(id: number, body: {
    time: string | null;
  }) {
    return this.httpClient.patch<TenantCastScheduleStandbyListResponse>(`@te/schedules-standby/${ id }`, body);
  }
}
