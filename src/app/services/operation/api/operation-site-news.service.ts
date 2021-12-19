import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOperationSiteNewsRequest } from 'src/app/services/operation/api/requests';
import { PaginatedResponse, SiteNewsResponse } from 'src/app/services/operation/api/responses';

@Injectable({
  providedIn: `root`,
})
export class OperationSiteNewsService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list(page: number = 1) {
    return this.httpClient.get<PaginatedResponse<SiteNewsResponse>>(`@op/site-news`, {
      params: {
        page,
      },
    });
  }

  create(body: CreateOperationSiteNewsRequest) {
    return this.httpClient.post<PaginatedResponse<SiteNewsResponse>>(`@op/site-news`, body);
  }

  get(id: number) {
    return this.httpClient.get<SiteNewsResponse>(`@op/site-news/${ id }`);
  }

  modify(id: number, body: CreateOperationSiteNewsRequest) {
    return this.httpClient.patch<PaginatedResponse<SiteNewsResponse>>(`@op/site-news/${ id }`, body);
  }

  delete(id: number) {
    return this.httpClient.delete<PaginatedResponse<SiteNewsResponse>>(`@op/site-news/${ id }`);
  }
}
