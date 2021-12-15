import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantLayoutTopComponent } from 'src/app/modules/tenant/modules/tenant-layout/components/tenant-layout-top/tenant-layout-top.component';
import { TenantLayoutOtherComponent } from 'src/app/modules/tenant/modules/tenant-layout/components/tenant-layout-other/tenant-layout-other.component';
import { TenantLayoutBannerComponent } from 'src/app/modules/tenant/modules/tenant-layout/components/tenant-layout-banner/tenant-layout-banner.component';
import { TenantLayoutDesignComponent } from 'src/app/modules/tenant/modules/tenant-layout/components/tenant-layout-design/tenant-layout-design.component';
import { TenantLayoutMoveBannerComponent } from 'src/app/modules/tenant/modules/tenant-layout/components/tenant-layout-move-banner/tenant-layout-move-banner.component';

const routes: Routes = [
  {
    path: 'top',
    component: TenantLayoutTopComponent,
  },
  {
    path: 'other',
    component: TenantLayoutOtherComponent,
  },
  {
    path: 'banner',
    component: TenantLayoutBannerComponent,
  },
  {
    path: 'design',
    component: TenantLayoutDesignComponent,
  },
  {
    path: 'animation-banner',
    component: TenantLayoutMoveBannerComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantLayoutRoutingModule {
}
