import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantBasicEditComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-basic-edit/tenant-basic-edit.component';
import { TenantTransportationComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-transportation/tenant-transportation.component';
import { TenantOptionComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-option/tenant-option.component';
import { TenantFreeSpaceComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-space/tenant-free-space.component';
import { TenantFreeSpaceCreateComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-space-create/tenant-free-space-create.component';
import { TenantFreeSpaceDetailComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-space-detail/tenant-free-space-detail.component';
import { TenantFreeBlockComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-block/tenant-free-block.component';
import { TenantFreeBlockCreateComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-block-create/tenant-free-block-create.component';
import { TenantFreeBlockDetailComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-block-detail/tenant-free-block-detail.component';

const routes: Routes = [
  {
    path: 'basic',
    component: TenantBasicEditComponent,
  },
  {
    path: 'transportation',
    component: TenantTransportationComponent,
  },
  {
    path: 'option',
    component: TenantOptionComponent,
  },
  {
    path: 'free-space',
    component: TenantFreeSpaceComponent,
  },
  {
    path: 'free-space/create',
    component: TenantFreeSpaceCreateComponent,
  },
  {
    path: 'free-space/:freeSpaceId',
    component: TenantFreeSpaceDetailComponent,
  },
  {
    path: 'free-block',
    component: TenantFreeBlockComponent,
  },
  {
    path: 'free-block/create',
    component: TenantFreeBlockCreateComponent,
  },
  {
    path: 'free-block/:freeBlockId',
    component: TenantFreeBlockDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantBasicRoutingModule {
}
