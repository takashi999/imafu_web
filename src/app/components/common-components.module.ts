import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/components/app.component';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardTimeRangeFormComponent } from './dashboard-time-range-form/dashboard-time-range-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    DashboardHeaderComponent,
    DashboardTimeRangeFormComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatRippleModule,
    MatButtonModule,
    RouterModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    AppComponent,
    TableListComponent,
    DashboardHeaderComponent,
    DashboardTimeRangeFormComponent,
  ],
})
export class CommonComponentsModule {
}
