import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantFreeGalleryComponent } from 'src/app/modules/tenant/modules/tenant-free-gallery/components/tenant-free-gallery/tenant-free-gallery.component';
import { TenantFreeGalleryCreateComponent } from 'src/app/modules/tenant/modules/tenant-free-gallery/components/tenant-free-gallery-create/tenant-free-gallery-create.component';
import { TenantFreeGalleryDetailComponent } from 'src/app/modules/tenant/modules/tenant-free-gallery/components/tenant-free-gallery-detail/tenant-free-gallery-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantFreeGalleryComponent,
  },
  {
    path: 'create',
    component: TenantFreeGalleryCreateComponent,
  },
  {
    path: ':freeGalleryId',
    component: TenantFreeGalleryDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantFreeGalleryRoutingModule {
}
