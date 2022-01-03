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
import {
  OperationDashboardContainerComponent,
} from './components/operation-dashboard-container/operation-dashboard-container.component';
import { OperationUsersComponent } from './components/operation-users/operation-users.component';
import { MatTableModule } from '@angular/material/table';
import { OperationUserDetailComponent } from './components/operation-user-detail/operation-user-detail.component';
import { OperationTenantGroupsComponent } from './components/operation-tenant-groups/operation-tenant-groups.component';
import { OperationUserCreateComponent } from './components/operation-user-create/operation-user-create.component';
import {
  OperationConfirmDialogComponent,
} from './components/operation-confirm-dialog/operation-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OperationTenantCreateComponent } from './components/operation-tenant-create/operation-tenant-create.component';
import { OperationTenantDetailComponent } from './components/operation-tenant-detail/operation-tenant-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import {
  OperationTenantGroupDetailComponent,
} from './components/operation-tenant-group-detail/operation-tenant-group-detail.component';
import {
  OperationTenantGroupCreateComponent,
} from './components/operation-tenant-group-create/operation-tenant-group-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import {
  OperationTenantUserDetailComponent,
} from './components/operation-tenant-user-detail/operation-tenant-user-detail.component';
import {
  OperationTenantUserCreateComponent,
} from './components/operation-tenant-user-create/operation-tenant-user-create.component';
import {
  OperationTenantBannerImageComponent,
} from './components/operation-tenant-banner-image/operation-tenant-banner-image.component';
import {
  OperationTenantCastServiceTypeListComponent,
} from './components/operation-tenant-cast-service-type-list/operation-tenant-cast-service-type-list.component';
import {
  OperationTenantCastServiceTypeDetailComponent,
} from './components/operation-tenant-cast-service-type-detail/operation-tenant-cast-service-type-detail.component';
import { OperationSiteConfigComponent } from './components/operation-site-config/operation-site-config.component';
import { OperationSiteNewsComponent } from './components/operation-site-news/operation-site-news.component';
import {
  OperationSiteNewsDetailComponent,
} from './components/operation-site-news-detail/operation-site-news-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';


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
    OperationTenantBannerImageComponent,
    OperationTenantCastServiceTypeListComponent,
    OperationTenantCastServiceTypeDetailComponent,
    OperationSiteConfigComponent,
    OperationSiteNewsComponent,
    OperationSiteNewsDetailComponent,
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
    MatPaginatorModule,
    ScrollingModule,
  ],
  exports: [
    OperationTenantBannerImageComponent,
  ],
})
export class OperationModule {
}
