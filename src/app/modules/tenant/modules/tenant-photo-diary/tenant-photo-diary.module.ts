import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantPhotoDiaryRoutingModule } from './tenant-photo-diary-routing.module';
import { TenantPhotoDiaryListComponent } from './components/tenant-photo-diary-list/tenant-photo-diary-list.component';
import { TenantPhotoDiaryDetailComponent } from './components/tenant-photo-diary-detail/tenant-photo-diary-detail.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TenantPhotoDiaryListComponent,
    TenantPhotoDiaryDetailComponent
  ],
  imports: [
    CommonModule,
    TenantPhotoDiaryRoutingModule,
    CommonComponentsModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class TenantPhotoDiaryModule { }
