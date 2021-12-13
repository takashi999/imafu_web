import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantLoginRoutingModule } from './tenant-login-routing.module';
import { TenantLoginComponent } from 'src/app/modules/tenant/modules/tenant-login/components/tenant-login/tenant-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TenantLoginComponent,
  ],
  imports: [
    CommonModule,
    TenantLoginRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class TenantLoginModule {
}
