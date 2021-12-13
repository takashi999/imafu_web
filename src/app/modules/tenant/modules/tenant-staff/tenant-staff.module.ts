import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantStaffRoutingModule } from './tenant-staff-routing.module';
import { TenantStaffComponent } from 'src/app/modules/tenant/modules/tenant-staff/components/tenant-staff/tenant-staff.component';
import { TenantStaffDetailComponent } from 'src/app/modules/tenant/modules/tenant-staff/components/tenant-staff-detail/tenant-staff-detail.component';
import { TenantStaffCreateComponent } from 'src/app/modules/tenant/modules/tenant-staff/components/tenant-staff-create/tenant-staff-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TenantStaffComponent,
    TenantStaffDetailComponent,
    TenantStaffCreateComponent,
  ],
  imports: [
    CommonModule,
    TenantStaffRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class TenantStaffModule {
}
