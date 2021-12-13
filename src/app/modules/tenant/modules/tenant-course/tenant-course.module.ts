import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantCourseRoutingModule } from './tenant-course-routing.module';
import { TenantCourseComponent } from 'src/app/modules/tenant/modules/tenant-course/components/tenant-course/tenant-course.component';
import { TenantCourseDetailComponent } from 'src/app/modules/tenant/modules/tenant-course/components/tenant-course-detail/tenant-course-detail.component';
import { TenantCourseCreateComponent } from 'src/app/modules/tenant/modules/tenant-course/components/tenant-course-create/tenant-course-create.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TenantCourseComponent,
    TenantCourseDetailComponent,
    TenantCourseCreateComponent,
  ],
  imports: [
    CommonModule,
    TenantCourseRoutingModule,
    CommonComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridListModule,
    TextFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class TenantCourseModule {
}
