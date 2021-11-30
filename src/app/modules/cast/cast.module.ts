import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CastRoutingModule } from './cast-routing.module';
import { TenantCastAppContainerComponent } from './components/tenant-cast-app-container/tenant-cast-app-container.component';
import { TenantCastLoginComponent } from './components/tenant-cast-login/tenant-cast-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { TenantCastDashboardContainerComponent } from './components/tenant-cast-dashboard-container/tenant-cast-dashboard-container.component';
import { TenantCastHomeComponent } from './components/tenant-cast-home/tenant-cast-home.component';


@NgModule({
  declarations: [
    TenantCastAppContainerComponent,
    TenantCastLoginComponent,
    TenantCastDashboardContainerComponent,
    TenantCastHomeComponent
  ],
  imports: [
    CommonModule,
    CastRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonComponentsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatRippleModule,
  ],
})
export class CastModule { }
