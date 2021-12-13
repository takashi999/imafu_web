import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantFreeImageComponent } from 'src/app/modules/tenant/modules/tenant-free-image/components/tenant-free-image/tenant-free-image.component';
import { TenantFreeImageCreateComponent } from 'src/app/modules/tenant/modules/tenant-free-image/components/tenant-free-image-create/tenant-free-image-create.component';
import { TenantFreeImageDetailComponent } from 'src/app/modules/tenant/modules/tenant-free-image/components/tenant-free-image-detail/tenant-free-image-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantFreeImageComponent,
  },
  {
    path: 'create',
    component: TenantFreeImageCreateComponent,
  },
  {
    path: ':freeImageId',
    component: TenantFreeImageDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantFreeImageRoutingModule {
}
