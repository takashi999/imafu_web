import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantDashboardContainerComponent } from 'src/app/modules/tenant/components/tenant-dashboard-container/tenant-dashboard-container.component';
import { TenantAppContainerComponent } from 'src/app/modules/tenant/components/tenant-app-container/tenant-app-container.component';
import { TenantBasicEditComponent } from 'src/app/modules/tenant/components/tenant-basic-edit/tenant-basic-edit.component';
import { TenantLoginComponent } from 'src/app/modules/tenant/components/tenant-login/tenant-login.component';
import { TenantGuestGuard } from 'src/app/guards/tenant-guest.guard';
import { TenantGuard } from 'src/app/guards/tenant.guard';
import { TenantCourseComponent } from 'src/app/modules/tenant/components/tenant-course/tenant-course.component';
import { TenantFreeGalleryComponent } from 'src/app/modules/tenant/components/tenant-free-gallery/tenant-free-gallery.component';
import { TenantOptionComponent } from 'src/app/modules/tenant/components/tenant-option/tenant-option.component';
import { TenantFreeBlockComponent } from 'src/app/modules/tenant/components/tenant-free-block/tenant-free-block.component';
import { TenantFreeImageComponent } from 'src/app/modules/tenant/components/tenant-free-image/tenant-free-image.component';
import { TenantStaffComponent } from 'src/app/modules/tenant/components/tenant-staff/tenant-staff.component';
import { TenantRankingComponent } from 'src/app/modules/tenant/components/tenant-ranking/tenant-ranking.component';
import { TenantFreeSpaceComponent } from 'src/app/modules/tenant/components/tenant-free-space/tenant-free-space.component';
import { TenantFreeBannerComponent } from 'src/app/modules/tenant/components/tenant-free-banner/tenant-free-banner.component';
import { TenantCastComponent } from 'src/app/modules/tenant/components/tenant-cast/tenant-cast.component';
import { TenantTransportationComponent } from 'src/app/modules/tenant/components/tenant-transportation/tenant-transportation.component';
import { TenantCourseDetailComponent } from 'src/app/modules/tenant/components/tenant-course-detail/tenant-course-detail.component';
import { TenantFreeBlockDetailComponent } from 'src/app/modules/tenant/components/tenant-free-block-detail/tenant-free-block-detail.component';
import { TenantFreeSpaceDetailComponent } from 'src/app/modules/tenant/components/tenant-free-space-detail/tenant-free-space-detail.component';
import { TenantRankingDetailComponent } from 'src/app/modules/tenant/components/tenant-ranking-detail/tenant-ranking-detail.component';
import { TenantFreeGalleryDetailComponent } from 'src/app/modules/tenant/components/tenant-free-gallery-detail/tenant-free-gallery-detail.component';
import { TenantCastDetailComponent } from 'src/app/modules/tenant/components/tenant-cast-detail/tenant-cast-detail.component';
import { TenantStaffDetailComponent } from 'src/app/modules/tenant/components/tenant-staff-detail/tenant-staff-detail.component';
import { TenantFreeBannerDetailComponent } from 'src/app/modules/tenant/components/tenant-free-banner-detail/tenant-free-banner-detail.component';
import { TenantFreeImageDetailComponent } from 'src/app/modules/tenant/components/tenant-free-image-detail/tenant-free-image-detail.component';
import { TenantFreeBlockCreateComponent } from 'src/app/modules/tenant/components/tenant-free-block-create/tenant-free-block-create.component';
import { TenantCourseCreateComponent } from 'src/app/modules/tenant/components/tenant-course-create/tenant-course-create.component';
import { TenantFreeGalleryCreateComponent } from 'src/app/modules/tenant/components/tenant-free-gallery-create/tenant-free-gallery-create.component';
import { TenantRankingCreateComponent } from 'src/app/modules/tenant/components/tenant-ranking-create/tenant-ranking-create.component';
import { TenantFreeImageCreateComponent } from 'src/app/modules/tenant/components/tenant-free-image-create/tenant-free-image-create.component';
import { TenantStaffCreateComponent } from 'src/app/modules/tenant/components/tenant-staff-create/tenant-staff-create.component';
import { TenantCastCreateComponent } from 'src/app/modules/tenant/components/tenant-cast-create/tenant-cast-create.component';
import { TenantFreeSpaceCreateComponent } from 'src/app/modules/tenant/components/tenant-free-space-create/tenant-free-space-create.component';
import { TenantFreeBannerCreateComponent } from 'src/app/modules/tenant/components/tenant-free-banner-create/tenant-free-banner-create.component';
import { TenantCastScheduleSettingComponent } from 'src/app/modules/tenant/components/tenant-cast-schedule-setting/tenant-cast-schedule-setting.component';
import { TenantCastScheduleComponent } from 'src/app/modules/tenant/components/tenant-cast-schedule/tenant-cast-schedule.component';

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
        component: TenantLoginComponent,
        canActivate: [ TenantGuestGuard ],
      },
      {
        path: '',
        component: TenantDashboardContainerComponent,
        canActivate: [ TenantGuard ],
        children: [
          {
            path: 'basic',
            component: TenantBasicEditComponent,
          },
          {
            path: 'course',
            component: TenantCourseComponent,
          },
          {
            path: 'course/create',
            component: TenantCourseCreateComponent,
          },
          {
            path: 'course/:courseId',
            component: TenantCourseDetailComponent,
          },
          {
            path: 'transportation',
            component: TenantTransportationComponent,
          },
          {
            path: 'option',
            component: TenantOptionComponent,
          },
          {
            path: 'free-space',
            component: TenantFreeSpaceComponent,
          },
          {
            path: 'free-space/create',
            component: TenantFreeSpaceCreateComponent,
          },
          {
            path: 'free-space/:freeSpaceId',
            component: TenantFreeSpaceDetailComponent,
          },
          {
            path: 'free-block',
            component: TenantFreeBlockComponent,
          },
          {
            path: 'free-block/create',
            component: TenantFreeBlockCreateComponent,
          },
          {
            path: 'free-block/:freeBlockId',
            component: TenantFreeBlockDetailComponent,
          },
          {
            path: 'staff',
            component: TenantStaffComponent,
          },
          {
            path: 'staff/create',
            component: TenantStaffCreateComponent,
          },
          {
            path: 'staff/:staffId',
            component: TenantStaffDetailComponent,
          },
          {
            path: 'free-banner',
            component: TenantFreeBannerComponent,
          },
          {
            path: 'free-banner/create',
            component: TenantFreeBannerCreateComponent,
          },
          {
            path: 'free-banner/:freeBannerId',
            component: TenantFreeBannerDetailComponent,
          },
          {
            path: 'free-gallery',
            component: TenantFreeGalleryComponent,
          },
          {
            path: 'free-gallery/create',
            component: TenantFreeGalleryCreateComponent,
          },
          {
            path: 'free-gallery/:freeGalleryId',
            component: TenantFreeGalleryDetailComponent,
          },
          {
            path: 'cast',
            component: TenantCastComponent,
          },
          {
            path: 'cast/create',
            component: TenantCastCreateComponent,
          },
          {
            path: 'cast/:castId',
            component: TenantCastDetailComponent,
          },
          {
            path: 'cast-schedule-setting',
            component: TenantCastScheduleSettingComponent,
          },
          {
            path: 'cast-schedule',
            component: TenantCastScheduleComponent,
          },
          {
            path: 'free-image',
            component: TenantFreeImageComponent,
          },
          {
            path: 'free-image/create',
            component: TenantFreeImageCreateComponent,
          },
          {
            path: 'free-image/:freeImageId',
            component: TenantFreeImageDetailComponent,
          },
          {
            path: 'ranking',
            component: TenantRankingComponent,
          },
          {
            path: 'ranking/create',
            component: TenantRankingCreateComponent,
          },
          {
            path: 'ranking/:rankingId',
            component: TenantRankingDetailComponent,
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
