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
import { OperationUserCreateComponent } from 'src/app/modules/operation/components/operation-user-create/operation-user-create.component';
import { OperationTenantDetailComponent } from 'src/app/modules/operation/components/operation-tenant-detail/operation-tenant-detail.component';
import { OperationTenantCreateComponent } from 'src/app/modules/operation/components/operation-tenant-create/operation-tenant-create.component';
import { OperationTenantGroupDetailComponent } from 'src/app/modules/operation/components/operation-tenant-group-detail/operation-tenant-group-detail.component';
import { OperationTenantGroupCreateComponent } from 'src/app/modules/operation/components/operation-tenant-group-create/operation-tenant-group-create.component';
import { OperationTenantUserDetailComponent } from 'src/app/modules/operation/components/operation-tenant-user-detail/operation-tenant-user-detail.component';
import { OperationTenantUserCreateComponent } from 'src/app/modules/operation/components/operation-tenant-user-create/operation-tenant-user-create.component';

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
            path: 'users/create',
            component: OperationUserCreateComponent,
            pathMatch: 'full',
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
            path: 'tenants/create',
            component: OperationTenantCreateComponent,
          },
          {
            path: 'tenants/:tenant_id',
            component: OperationTenantDetailComponent,
          },
          {
            path: 'tenants/:tenant_id/users/create',
            component: OperationTenantUserCreateComponent,
          },
          {
            path: 'tenants/:tenant_id/users/:tenant_user_id',
            component: OperationTenantUserDetailComponent,
          },
          {
            path: 'tenant-groups',
            component: OperationTenantGroupsComponent,
          },
          {
            path: 'tenant-groups/create',
            component: OperationTenantGroupCreateComponent,
          },
          {
            path: 'tenant-groups/:tenant_group_id',
            component: OperationTenantGroupDetailComponent,
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
