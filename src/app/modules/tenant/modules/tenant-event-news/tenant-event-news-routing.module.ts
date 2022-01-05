import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TenantEventNewsDetailComponent,
} from 'src/app/modules/tenant/modules/tenant-event-news/components/tenant-event-news-detail/tenant-event-news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantEventNewsDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantEventNewsRoutingModule {
}
