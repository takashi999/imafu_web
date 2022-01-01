import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantDashboardContainerComponent } from 'src/app/modules/tenant/components/tenant-dashboard-container/tenant-dashboard-container.component';
import { TenantAppContainerComponent } from 'src/app/modules/tenant/components/tenant-app-container/tenant-app-container.component';
import { TenantGuard } from 'src/app/guards/tenant.guard';

const routes: Routes = [
  {
    path: '',
    component: TenantAppContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'basic',
      },
      {
        path: 'login',
        loadChildren: () => import('./modules/tenant-login/tenant-login.module').then(m => m.TenantLoginModule),
      },
      {
        path: '',
        component: TenantDashboardContainerComponent,
        canActivate: [ TenantGuard ],
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/tenant-basic/tenant-basic.module').then(m => m.TenantBasicModule),
          },
          {
            path: 'course',
            loadChildren: () => import('./modules/tenant-course/tenant-course.module').then(m => m.TenantCourseModule),
          },
          {
            path: 'staff',
            loadChildren: () => import('./modules/tenant-staff/tenant-staff.module').then(m => m.TenantStaffModule),
          },
          {
            path: 'free-banner',
            loadChildren: () => import('./modules/tenant-free-banner/tenant-free-banner.module').then(m => m.TenantFreeBannerModule),
          },
          {
            path: 'free-gallery',
            loadChildren: () => import('./modules/tenant-free-gallery/tenant-free-gallery.module').then(m => m.TenantFreeGalleryModule),
          },
          {
            path: 'cast',
            loadChildren: () => import('./modules/tenant-cast/tenant-cast.module').then(m => m.TenantCastModule),
          },
          {
            path: 'cast-schedule',
            loadChildren: () => import('./modules/tenant-cast-schedule/tenant-cast-schedule.module').then(m => m.TenantCastScheduleModule),
          },
          {
            path: 'free-image',
            loadChildren: () => import('./modules/tenant-free-image/tenant-free-image.module').then(m => m.TenantFreeImageModule),
          },
          {
            path: 'ranking',
            loadChildren: () => import('./modules/tenant-ranking/tenant-ranking.module').then(m => m.TenantRankingModule),
          },
          {
            path: 'layout',
            loadChildren: () => import('./modules/tenant-layout/tenant-layout.module').then(m => m.TenantLayoutModule),
          },
          {
            path: 'photo-diary',
            loadChildren: () => import('./modules/tenant-photo-diary/tenant-photo-diary.module').then(m => m.TenantPhotoDiaryModule),
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TenantRoutingModule {
}
