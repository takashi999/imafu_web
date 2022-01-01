import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TenantPhotoDiaryDetailComponent,
} from 'src/app/modules/tenant/modules/tenant-photo-diary/components/tenant-photo-diary-detail/tenant-photo-diary-detail.component';
import {
  TenantPhotoDiaryListComponent,
} from 'src/app/modules/tenant/modules/tenant-photo-diary/components/tenant-photo-diary-list/tenant-photo-diary-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TenantPhotoDiaryListComponent,
  },
  {
    path: ':photoDiaryId',
    component: TenantPhotoDiaryDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantPhotoDiaryRoutingModule {
}
