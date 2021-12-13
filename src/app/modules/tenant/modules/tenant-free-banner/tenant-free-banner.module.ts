import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantFreeBannerRoutingModule } from './tenant-free-banner-routing.module';
import { TenantFreeBannerComponent } from 'src/app/modules/tenant/modules/tenant-free-banner/components/tenant-free-banner/tenant-free-banner.component';
import { TenantFreeBannerDetailComponent } from 'src/app/modules/tenant/modules/tenant-free-banner/components/tenant-free-banner-detail/tenant-free-banner-detail.component';
import { TenantFreeBannerCreateComponent } from 'src/app/modules/tenant/modules/tenant-free-banner/components/tenant-free-banner-create/tenant-free-banner-create.component';
import { TenantFreeBannerImagesComponent } from 'src/app/modules/tenant/modules/tenant-free-banner/components/tenant-free-banner-images/tenant-free-banner-images.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    TenantFreeBannerComponent,
    TenantFreeBannerDetailComponent,
    TenantFreeBannerCreateComponent,
    TenantFreeBannerImagesComponent,
  ],
  imports: [
    CommonModule,
    TenantFreeBannerRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
})
export class TenantFreeBannerModule {
}
