import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantCourseComponent } from 'src/app/modules/tenant/modules/tenant-course/components/tenant-course/tenant-course.component';
import { TenantCourseCreateComponent } from 'src/app/modules/tenant/modules/tenant-course/components/tenant-course-create/tenant-course-create.component';
import { TenantCourseDetailComponent } from 'src/app/modules/tenant/modules/tenant-course/components/tenant-course-detail/tenant-course-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TenantCourseComponent,
  },
  {
    path: 'create',
    component: TenantCourseCreateComponent,
  },
  {
    path: ':courseId',
    component: TenantCourseDetailComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantCourseRoutingModule {
}
