import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TenantShopNewsListComponent,
} from 'src/app/modules/tenant/modules/tenant-shop-news/components/tenant-shop-news-list/tenant-shop-news-list.component';
import {
  TenantShopNewsDetailComponent,
} from 'src/app/modules/tenant/modules/tenant-shop-news/components/tenant-shop-news-detail/tenant-shop-news-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TenantShopNewsListComponent,
  },
  {
    path: 'create',
    component: TenantShopNewsDetailComponent,
  },
  {
    path: ':tenantShopNewsId',
    component: TenantShopNewsDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantShopNewsRoutingModule {
}
