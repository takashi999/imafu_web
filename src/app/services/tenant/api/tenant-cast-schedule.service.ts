import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantCastScheduleListResponse } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantCastScheduleService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get(params: {
    start_date?: string,
    month?: boolean,
    cast_id?: number,
  }) {
    return this.httpClient.get<TenantCastScheduleListResponse>(`@te/schedules`, {
      params: {
        ...typeof params.start_date !== 'undefined' ? { start_date: params.start_date } : {},
        ...typeof params.month !== 'undefined' ? { month: params.month ? '1' : '0' } : {},
        ...typeof params.cast_id !== 'undefined' ? { cast_id: params.cast_id } : {},
      },
    });
  }

  modify(body: {
    tenant_cast_id: number;
    schedule_date: string;
    start_time: string;
    end_time: string;
    finished: boolean;
    comment: string;
  }) {
    return this.httpClient.patch<TenantCastScheduleListResponse>(`@te/schedules`, body);
  }

  delete(id: number) {
    return this.httpClient.delete<TenantCastScheduleListResponse>(`@te/schedules/${ id }`);
  }
}
