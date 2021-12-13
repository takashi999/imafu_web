import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantBasicRoutingModule } from './tenant-basic-routing.module';
import { TenantBasicEditComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-basic-edit/tenant-basic-edit.component';
import { TenantTransportationComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-transportation/tenant-transportation.component';
import { TenantOptionComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-option/tenant-option.component';
import { TenantFreeSpaceComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-space/tenant-free-space.component';
import { TenantFreeBlockComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-block/tenant-free-block.component';
import { TenantFreeSpaceDetailComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-space-detail/tenant-free-space-detail.component';
import { TenantFreeBlockDetailComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-block-detail/tenant-free-block-detail.component';
import { TenantFreeSpaceCreateComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-space-create/tenant-free-space-create.component';
import { TenantFreeBlockCreateComponent } from 'src/app/modules/tenant/modules/tenant-basic/components/tenant-free-block-create/tenant-free-block-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TenantBasicEditComponent,
    TenantTransportationComponent,
    TenantOptionComponent,
    TenantFreeSpaceComponent,
    TenantFreeBlockComponent,
    TenantFreeSpaceDetailComponent,
    TenantFreeBlockDetailComponent,
    TenantFreeSpaceCreateComponent,
    TenantFreeBlockCreateComponent,
  ],
  imports: [
    CommonModule,
    TenantBasicRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatGridListModule,
    MatGridListModule,
    MatGridListModule,
    MatRadioModule,
    MatRadioModule,
    MatRadioModule,
    MatRadioModule,
    MatRadioModule,
    MatRadioModule,
    MatRadioModule,
    MatRadioModule,
    MatRadioModule,
    MatSelectModule,
    TextFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class TenantBasicModule {
}
