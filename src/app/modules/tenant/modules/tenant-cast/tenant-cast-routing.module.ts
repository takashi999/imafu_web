import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantCastComponent } from 'src/app/modules/tenant/modules/tenant-cast/components/tenant-cast/tenant-cast.component';
import { TenantCastCreateComponent } from 'src/app/modules/tenant/modules/tenant-cast/components/tenant-cast-create/tenant-cast-create.component';
import { TenantCastDetailComponent } from 'src/app/modules/tenant/modules/tenant-cast/components/tenant-cast-detail/tenant-cast-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantCastComponent,
  },
  {
    path: 'create',
    component: TenantCastCreateComponent,
  },
  {
    path: ':castId',
    component: TenantCastDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantCastRoutingModule {
}
