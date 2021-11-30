import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantCastGuestGuard } from 'src/app/guards/tenant-cast-guest.guard';
import { TenantCastLoginComponent } from 'src/app/modules/cast/components/tenant-cast-login/tenant-cast-login.component';
import { TenantCastAppContainerComponent } from 'src/app/modules/cast/components/tenant-cast-app-container/tenant-cast-app-container.component';
import { TenantCastDashboardContainerComponent } from 'src/app/modules/cast/components/tenant-cast-dashboard-container/tenant-cast-dashboard-container.component';
import { TenantCastHomeComponent } from 'src/app/modules/cast/components/tenant-cast-home/tenant-cast-home.component';
import { TenantCastGuard } from 'src/app/guards/tenant-cast.guard';

const routes: Routes = [
  {
    path: '',
    component: TenantCastAppContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'login',
        component: TenantCastLoginComponent,
        canActivate: [ TenantCastGuestGuard ],
      },
      {
        path: '',
        component: TenantCastDashboardContainerComponent,
        canActivate: [ TenantCastGuard ],
        children: [
          {
            path: 'home',
            component: TenantCastHomeComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class CastRoutingModule {
}
