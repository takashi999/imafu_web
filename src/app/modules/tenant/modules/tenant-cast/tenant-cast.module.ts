import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantCastRoutingModule } from './tenant-cast-routing.module';
import { TenantCastComponent } from 'src/app/modules/tenant/modules/tenant-cast/components/tenant-cast/tenant-cast.component';
import { TenantCastDetailComponent } from 'src/app/modules/tenant/modules/tenant-cast/components/tenant-cast-detail/tenant-cast-detail.component';
import { TenantCastCreateComponent } from 'src/app/modules/tenant/modules/tenant-cast/components/tenant-cast-create/tenant-cast-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    TenantCastComponent,
    TenantCastDetailComponent,
    TenantCastCreateComponent,
  ],
  imports: [
    CommonModule,
    TenantCastRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
})
export class TenantCastModule {
}
