import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantCastScheduleSettingComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule-setting/tenant-cast-schedule-setting.component';
import { TenantCastScheduleComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule/tenant-cast-schedule.component';
import { TenantCastScheduleStandByStatusComponent } from 'src/app/modules/tenant/modules/tenant-cast-schedule/components/tenant-cast-schedule-stand-by-status/tenant-cast-schedule-stand-by-status.component';

const routes: Routes = [
  {
    path: 'cast-schedule-setting',
    component: TenantCastScheduleSettingComponent,
  },
  {
    path: 'cast-schedule',
    component: TenantCastScheduleComponent,
  },
  {
    path: 'cast-schedule-status',
    component: TenantCastScheduleStandByStatusComponent,
  } ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantCastScheduleRoutingModule {
}
