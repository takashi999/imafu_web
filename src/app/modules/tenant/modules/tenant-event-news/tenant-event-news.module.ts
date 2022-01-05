import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantEventNewsRoutingModule } from './tenant-event-news-routing.module';
import { TenantEventNewsDetailComponent } from './components/tenant-event-news-detail/tenant-event-news-detail.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TenantEventNewsDetailComponent
  ],
  imports: [
    CommonModule,
    TenantEventNewsRoutingModule,
    CommonComponentsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class TenantEventNewsModule { }
