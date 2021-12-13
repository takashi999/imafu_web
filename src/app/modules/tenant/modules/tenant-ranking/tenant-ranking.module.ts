import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRankingRoutingModule } from './tenant-ranking-routing.module';
import { TenantRankingComponent } from 'src/app/modules/tenant/modules/tenant-ranking/components/tenant-ranking/tenant-ranking.component';
import { TenantRankingDetailComponent } from 'src/app/modules/tenant/modules/tenant-ranking/components/tenant-ranking-detail/tenant-ranking-detail.component';
import { TenantRankingCreateComponent } from 'src/app/modules/tenant/modules/tenant-ranking/components/tenant-ranking-create/tenant-ranking-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TenantRankingComponent,
    TenantRankingDetailComponent,
    TenantRankingCreateComponent,
  ],
  imports: [
    CommonModule,
    TenantRankingRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class TenantRankingModule {
}
