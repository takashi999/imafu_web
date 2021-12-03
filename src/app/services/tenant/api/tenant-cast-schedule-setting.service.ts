import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModifyTenantCastScheduleSettingRequest } from 'src/app/services/tenant/api/requests';
import { TenantCastScheduleSettingResponse } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantCastScheduleSettingService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<TenantCastScheduleSettingResponse>('@te/schedule-setting');
  }

  modify(body: ModifyTenantCastScheduleSettingRequest) {
    return this.httpClient.patch<TenantCastScheduleSettingResponse>('@te/schedule-setting', body);
  }
}
