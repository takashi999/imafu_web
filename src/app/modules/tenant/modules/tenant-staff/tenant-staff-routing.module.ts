import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantStaffComponent } from 'src/app/modules/tenant/modules/tenant-staff/components/tenant-staff/tenant-staff.component';
import { TenantStaffCreateComponent } from 'src/app/modules/tenant/modules/tenant-staff/components/tenant-staff-create/tenant-staff-create.component';
import { TenantStaffDetailComponent } from 'src/app/modules/tenant/modules/tenant-staff/components/tenant-staff-detail/tenant-staff-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantStaffComponent,
  },
  {
    path: 'create',
    component: TenantStaffCreateComponent,
  },
  {
    path: ':staffId',
    component: TenantStaffDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantStaffRoutingModule {
}
