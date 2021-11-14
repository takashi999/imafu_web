import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CastServiceTypes,
  CastStyleTypes,
  CastTypes,
  EditableTextTypes,
  ForeignLinks,
  FreeBannerDisplaySpaces,
  FreeBannerImageCastLinkTypes,
  FreeBannerImageTenantLinkTypes,
  FreeBlockDisplaySpaces,
  FreeBlockDisplayTypes,
  FreeImageTypes,
} from 'src/app/services/tenant/api/responses';

@Injectable({
  providedIn: 'root',
})
export class TenantMasterService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  editableTextTypes() {
    return this.httpClient.get<EditableTextTypes>('@te/master/editable-text-types');
  }

  castServiceTypes() {
    return this.httpClient.get<CastServiceTypes>('@te/master/cast-service-types');
  }

  castTypes() {
    return this.httpClient.get<CastTypes>('@te/master/cast-types');
  }

  castStyleTypes() {
    return this.httpClient.get<CastStyleTypes>('@te/master/cast-style-types');
  }

  freeBannerDisplaySpaces() {
    return this.httpClient.get<FreeBannerDisplaySpaces>('@te/master/free-banner-display-spaces');
  }

  freeBannerImageCastLinkTypes() {
    return this.httpClient.get<FreeBannerImageCastLinkTypes>('@te/master/free-banner-image-cast-link-types');
  }

  freeBannerImageTenantLinkTypes() {
    return this.httpClient.get<FreeBannerImageTenantLinkTypes>('@te/master/free-banner-image-tenant-link-types');
  }

  freeBlockDisplaySpaces() {
    return this.httpClient.get<FreeBlockDisplaySpaces>('@te/master/free-block-display-spaces');
  }

  freeBlockDisplayTypes() {
    return this.httpClient.get<FreeBlockDisplayTypes>('@te/master/free-block-display-types');
  }

  freeImageTypes() {
    return this.httpClient.get<FreeImageTypes>('@te/master/free-image-types');
  }

  foreignLinks() {
    return this.httpClient.get<ForeignLinks>('@te/master/foreign-links');
  }
}
