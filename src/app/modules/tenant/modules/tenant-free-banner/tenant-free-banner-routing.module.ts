import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantFreeBannerComponent } from 'src/app/modules/tenant/modules/tenant-free-banner/components/tenant-free-banner/tenant-free-banner.component';
import { TenantFreeBannerCreateComponent } from 'src/app/modules/tenant/modules/tenant-free-banner/components/tenant-free-banner-create/tenant-free-banner-create.component';
import { TenantFreeBannerDetailComponent } from 'src/app/modules/tenant/modules/tenant-free-banner/components/tenant-free-banner-detail/tenant-free-banner-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantFreeBannerComponent,
  },
  {
    path: 'create',
    component: TenantFreeBannerCreateComponent,
  },
  {
    path: ':freeBannerId',
    component: TenantFreeBannerDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantFreeBannerRoutingModule {
}
