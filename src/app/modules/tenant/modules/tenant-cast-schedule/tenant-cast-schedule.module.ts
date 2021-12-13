import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantCastScheduleRoutingModule } from './tenant-cast-schedule-routing.module';
import { TenantCastScheduleSettingComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule-setting/tenant-cast-schedule-setting.component';
import { TenantCastScheduleComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule/tenant-cast-schedule.component';
import { TenantCastScheduleDialogComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule-dialog/tenant-cast-schedule-dialog.component';
import { TenantCastScheduleStandByStatusComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule-stand-by-status/tenant-cast-schedule-stand-by-status.component';
import { TenantCastScheduleStandByStatusDialogComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule-stand-by-status-dialog/tenant-cast-schedule-stand-by-status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    TenantCastScheduleSettingComponent,
    TenantCastScheduleComponent,
    TenantCastScheduleDialogComponent,
    TenantCastScheduleStandByStatusComponent,
    TenantCastScheduleStandByStatusDialogComponent,
  ],
  imports: [
    CommonModule,
    TenantCastScheduleRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatListModule,
    MatCheckboxModule,
    CommonComponentsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatRippleModule,
  ],
})
export class TenantCastScheduleModule {
}
