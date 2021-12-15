import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TenantModifyTenantLayoutBannerRequest,
  TenantModifyTenantLayoutDesignRequest,
  TenantModifyTenantLayoutModulesRequest,
  TenantModifyTenantLayoutMoveBannerRequest,
  TenantModifyTenantLayoutSideContentRequest,
} from 'src/app/services/tenant/api/requests';
import { TenantLayout } from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantLayoutService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<TenantLayout>(`@te/layout`);
  }

  modifyModules(body: TenantModifyTenantLayoutModulesRequest) {
    return this.httpClient.patch<TenantLayout>(`@te/layout/modules`, body);
  }

  modifySideContent(body: TenantModifyTenantLayoutSideContentRequest) {
    return this.httpClient.patch<TenantLayout>(`@te/layout/side-content`, body);
  }

  listBanners() {
    return this.httpClient.get(`@te/layout/banners`);
  }

  modifyBanner(body: TenantModifyTenantLayoutBannerRequest) {
    return this.httpClient.patch(`@te/layout/banners`, body);
  }

  modifyDesign(body: TenantModifyTenantLayoutDesignRequest) {
    return this.httpClient.patch<TenantLayout>(`@te/layout/design`, body);
  }

  getMoveBanners() {
    return this.httpClient.get(`@te/layout/move-banner`);
  }

  modifyMoveBanners(body: TenantModifyTenantLayoutMoveBannerRequest) {
    return this.httpClient.patch(`@te/layout/move-banner`, body);
  }
}
