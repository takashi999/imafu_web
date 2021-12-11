import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OperationMasterService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  sectors() {
    return this.httpClient.get<{ id: number; display_name: string; }[]>('@op/master/sectors');
  }

  regions() {
    return this.httpClient.get<{ id: number; display_name: string; }[]>('@op/master/regions');
  }

  plans() {
    return this.httpClient.get<{ id: number; display_name: string; is_limited: boolean; }[]>('@op/master/plans');
  }

  freeBannerImageCastLinkTypes() {
    return this.httpClient.get<{ id: number; type_id: string; display_name: string }[]>('@op/master/free-banner-image-cast-link-types');
  }

  freeBannerImageTenantLinkTypes() {
    return this.httpClient.get<{ id: number; type_id: string; display_name: string }[]>('@op/master/free-banner-image-tenant-link-types');
  }
}
