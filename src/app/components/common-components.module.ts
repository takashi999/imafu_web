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


@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    DashboardHeaderComponent,
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
  ],
  exports: [
    AppComponent,
    TableListComponent,
    DashboardHeaderComponent,
  ],
})
export class CommonComponentsModule {
}
