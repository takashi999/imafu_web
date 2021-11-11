import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { OperationAppContainerComponent } from './components/operation-app-container/operation-app-container.component';
import { OperationLoginComponent } from './components/operation-login/operation-login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OperationTenantsComponent } from './components/operation-tenants/operation-tenants.component';
import { OperationDashboardContainerComponent } from './components/operation-dashboard-container/operation-dashboard-container.component';
import { OperationUsersComponent } from './components/operation-users/operation-users.component';
import { MatTableModule } from '@angular/material/table';
import { OperationUserDetailComponent } from './components/operation-user-detail/operation-user-detail.component';
import { OperationTenantGroupsComponent } from './components/operation-tenant-groups/operation-tenant-groups.component';
import { OperationUserCreateComponent } from './components/operation-user-create/operation-user-create.component';
import { OperationConfirmDialogComponent } from './components/operation-confirm-dialog/operation-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OperationTenantCreateComponent } from './components/operation-tenant-create/operation-tenant-create.component';
import { OperationTenantDetailComponent } from './components/operation-tenant-detail/operation-tenant-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { OperationTenantGroupDetailComponent } from './components/operation-tenant-group-detail/operation-tenant-group-detail.component';
import { OperationTenantGroupCreateComponent } from './components/operation-tenant-group-create/operation-tenant-group-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { OperationTenantUserDetailComponent } from './components/operation-tenant-user-detail/operation-tenant-user-detail.component';
import { OperationTenantUserCreateComponent } from './components/operation-tenant-user-create/operation-tenant-user-create.component';


@NgModule({
  declarations: [
    OperationAppContainerComponent,
    OperationLoginComponent,
    OperationTenantsComponent,
    OperationDashboardContainerComponent,
    OperationUsersComponent,
    OperationUserDetailComponent,
    OperationTenantGroupsComponent,
    OperationUserCreateComponent,
    OperationConfirmDialogComponent,
    OperationTenantCreateComponent,
    OperationTenantDetailComponent,
    OperationTenantGroupDetailComponent,
    OperationTenantGroupCreateComponent,
    OperationTenantUserDetailComponent,
    OperationTenantUserCreateComponent,
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    CommonComponentsModule,
  ],
  exports: [],
})
export class OperationModule {
}
