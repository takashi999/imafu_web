import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantRankingComponent } from 'src/app/modules/tenant/modules/tenant-ranking/components/tenant-ranking/tenant-ranking.component';
import { TenantRankingCreateComponent } from 'src/app/modules/tenant/modules/tenant-ranking/components/tenant-ranking-create/tenant-ranking-create.component';
import { TenantRankingDetailComponent } from 'src/app/modules/tenant/modules/tenant-ranking/components/tenant-ranking-detail/tenant-ranking-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantRankingComponent,
  },
  {
    path: 'create',
    component: TenantRankingCreateComponent,
  },
  {
    path: ':rankingId',
    component: TenantRankingDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantRankingRoutingModule {
}
