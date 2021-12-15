import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantLayoutRoutingModule } from './tenant-layout-routing.module';
import { TenantLayoutTopComponent } from './components/tenant-layout-top/tenant-layout-top.component';
import { TenantLayoutOtherComponent } from './components/tenant-layout-other/tenant-layout-other.component';
import { TenantLayoutBannerComponent } from './components/tenant-layout-banner/tenant-layout-banner.component';
import { TenantLayoutDesignComponent } from './components/tenant-layout-design/tenant-layout-design.component';
import { TenantLayoutMoveBannerComponent } from './components/tenant-layout-move-banner/tenant-layout-move-banner.component';
import { MatCardModule } from '@angular/material/card';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TenantLayoutBannerImageComponent } from './components/tenant-layout-banner-image/tenant-layout-banner-image.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    TenantLayoutTopComponent,
    TenantLayoutOtherComponent,
    TenantLayoutBannerComponent,
    TenantLayoutDesignComponent,
    TenantLayoutMoveBannerComponent,
    TenantLayoutBannerImageComponent
  ],
  imports: [
    CommonModule,
    TenantLayoutRoutingModule,
    MatCardModule,
    CommonComponentsModule,
    MatButtonModule,
    DragDropModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
  ],
})
export class TenantLayoutModule { }
