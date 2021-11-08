import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantDashboardContainerComponent } from 'src/app/modules/tenant/components/tenant-dashboard-container/tenant-dashboard-container.component';
import { TenantAppContainerComponent } from 'src/app/modules/tenant/components/tenant-app-container/tenant-app-container.component';
import { TenantBasicEditComponent } from 'src/app/modules/tenant/components/tenant-basic-edit/tenant-basic-edit.component';
import { TenantLoginComponent } from 'src/app/modules/tenant/components/tenant-login/tenant-login.component';
import { TenantGuestGuard } from 'src/app/guards/tenant-guest.guard';
import { TenantGuard } from 'src/app/guards/tenant.guard';

const routes: Routes = [
  {
    path: '',
    component: TenantAppContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'basic',
      },
      {
        path: 'login',
        component: TenantLoginComponent,
        canActivate: [ TenantGuestGuard ],
      },
      {
        path: '',
        component: TenantDashboardContainerComponent,
        canActivate: [ TenantGuard ],
        children: [
          {
            path: 'basic',
            component: TenantBasicEditComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantRoutingModule {
}
