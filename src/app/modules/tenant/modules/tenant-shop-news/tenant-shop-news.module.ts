import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantShopNewsRoutingModule } from './tenant-shop-news-routing.module';
import { TenantShopNewsListComponent } from './components/tenant-shop-news-list/tenant-shop-news-list.component';
import { TenantShopNewsDetailComponent } from './components/tenant-shop-news-detail/tenant-shop-news-detail.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    TenantShopNewsListComponent,
    TenantShopNewsDetailComponent,
  ],
  imports: [
    CommonModule,
    TenantShopNewsRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatGridListModule,
  ],
})
export class TenantShopNewsModule {
}
