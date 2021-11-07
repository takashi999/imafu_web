import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationAppContainerComponent } from 'src/app/modules/operation/components/operation-app-container/operation-app-container.component';
import { OperationLoginComponent } from 'src/app/modules/operation/components/operation-login/operation-login.component';
import { OperationGuestGuard } from 'src/app/guards/operation-guest.guard';
import { OperationGuard } from 'src/app/guards/operation.guard';
import { OperationTenantsComponent } from 'src/app/modules/operation/components/operation-tenants/operation-tenants.component';
import { OperationDashboardContainerComponent } from 'src/app/modules/operation/components/operation-dashboard-container/operation-dashboard-container.component';
import { OperationUsersComponent } from 'src/app/modules/operation/components/operation-users/operation-users.component';
import { OperationUserDetailComponent } from 'src/app/modules/operation/components/operation-user-detail/operation-user-detail.component';
import { OperationTenantGroupsComponent } from 'src/app/modules/operation/components/operation-tenant-groups/operation-tenant-groups.component';

const routes: Routes = [
  {
    path: '',
    component: OperationAppContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: 'login',
        component: OperationLoginComponent,
        canActivate: [ OperationGuestGuard ],
      },
      {
        path: '',
        component: OperationDashboardContainerComponent,
        canActivate: [ OperationGuard ],
        children: [
          {
            path: 'users',
            component: OperationUsersComponent,
          },
          {
            path: 'users/:user_id',
            component: OperationUserDetailComponent,
          },
          {
            path: 'tenants',
            component: OperationTenantsComponent,
          },
          {
            path: 'tenant-groups',
            component: OperationTenantGroupsComponent,
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
export class OperationRoutingModule {
}
