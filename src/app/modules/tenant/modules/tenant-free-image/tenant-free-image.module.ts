import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantFreeImageRoutingModule } from './tenant-free-image-routing.module';
import { TenantFreeImageComponent } from 'src/app/modules/tenant/modules/tenant-free-image/components/tenant-free-image/tenant-free-image.component';
import { TenantFreeImageDetailComponent } from 'src/app/modules/tenant/modules/tenant-free-image/components/tenant-free-image-detail/tenant-free-image-detail.component';
import { TenantFreeImageCreateComponent } from 'src/app/modules/tenant/modules/tenant-free-image/components/tenant-free-image-create/tenant-free-image-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TenantFreeImageComponent,
    TenantFreeImageDetailComponent,
    TenantFreeImageCreateComponent,
  ],
  imports: [
    CommonModule,
    TenantFreeImageRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class TenantFreeImageModule {
}
