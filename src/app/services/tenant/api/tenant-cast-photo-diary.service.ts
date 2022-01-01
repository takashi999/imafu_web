import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModifyTenantCastPhotoDiaryRequest } from 'src/app/services/tenant/api/requests';
import { TenantCastPhotoDiary, TenantCastPhotoDiaryList } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantCastPhotoDiaryService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list(page: number = 1) {
    return this.httpClient.get<TenantCastPhotoDiaryList>('@te/photo-diary', {
      params: {
        page,
      },
    });
  }

  get(id: number) {
    return this.httpClient.get<TenantCastPhotoDiary>(`@te/photo-diary/${ id }`);
  }

  modify(id: number, body: ModifyTenantCastPhotoDiaryRequest) {
    return this.httpClient.patch<TenantCastPhotoDiaryList>(`@te/photo-diary/${ id }`, body);
  }

  delete(id: number) {
    return this.httpClient.delete<TenantCastPhotoDiaryList>(`@te/photo-diary/${ id }`);
  }
}
