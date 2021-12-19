import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationSiteConfigResponse } from 'src/app/services/operation/api/responses';
import { OperationSiteConfigRequest } from 'src/app/services/operation/api/requests';

@Injectable({
  providedIn: 'root',
})
export class OperationSiteConfigService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<OperationSiteConfigResponse>('@op/operation-config');
  }

  config(body: OperationSiteConfigRequest) {
    return this.httpClient.patch<OperationSiteConfigResponse>('@op/operation-config', body);
  }
}
