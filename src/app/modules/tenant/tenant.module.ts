import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantDashboardContainerComponent } from './components/tenant-dashboard-container/tenant-dashboard-container.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TenantAppContainerComponent } from './components/tenant-app-container/tenant-app-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TenantLoginComponent } from './components/tenant-login/tenant-login.component';
import { TenantBasicEditComponent } from './components/tenant-basic-edit/tenant-basic-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonComponentsModule } from 'src/app/components/common-components.module';


@NgModule({
  declarations: [
    TenantDashboardContainerComponent,
    TenantAppContainerComponent,
    TenantLoginComponent,
    TenantBasicEditComponent
  ],
    imports: [
        CommonModule,
        TenantRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatRippleModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        CommonComponentsModule,
    ],
})
export class TenantModule { }
