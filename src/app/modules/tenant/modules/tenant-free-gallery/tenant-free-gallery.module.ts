import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantFreeGalleryRoutingModule } from './tenant-free-gallery-routing.module';
import { TenantFreeGalleryComponent } from 'src/app/modules/tenant/modules/tenant-free-gallery/components/tenant-free-gallery/tenant-free-gallery.component';
import { TenantFreeGalleryDetailComponent } from 'src/app/modules/tenant/modules/tenant-free-gallery/components/tenant-free-gallery-detail/tenant-free-gallery-detail.component';
import { TenantFreeGalleryCreateComponent } from 'src/app/modules/tenant/modules/tenant-free-gallery/components/tenant-free-gallery-create/tenant-free-gallery-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    TenantFreeGalleryComponent,
    TenantFreeGalleryDetailComponent,
    TenantFreeGalleryCreateComponent,
  ],
  imports: [
    CommonModule,
    TenantFreeGalleryRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class TenantFreeGalleryModule {
}
