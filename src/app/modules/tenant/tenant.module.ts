import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantDashboardContainerComponent } from './components/tenant-dashboard-container/tenant-dashboard-container.component';
import { TenantAppContainerComponent } from './components/tenant-app-container/tenant-app-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TenantDashboardContainerComponent,
    TenantAppContainerComponent,
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    CKEditorModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class TenantModule {
}
