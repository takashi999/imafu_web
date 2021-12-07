import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantDashboardContainerComponent } from './components/tenant-dashboard-container/tenant-dashboard-container.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TenantAppContainerComponent } from './components/tenant-app-container/tenant-app-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TenantLoginComponent } from './components/tenant-login/tenant-login.component';
import { TenantBasicEditComponent } from './components/tenant-basic-edit/tenant-basic-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { TenantCourseComponent } from './components/tenant-course/tenant-course.component';
import { TenantTransportationComponent } from './components/tenant-transportation/tenant-transportation.component';
import { TenantOptionComponent } from './components/tenant-option/tenant-option.component';
import { TenantFreeSpaceComponent } from './components/tenant-free-space/tenant-free-space.component';
import { TenantFreeBlockComponent } from './components/tenant-free-block/tenant-free-block.component';
import { TenantStaffComponent } from './components/tenant-staff/tenant-staff.component';
import { TenantFreeBannerComponent } from './components/tenant-free-banner/tenant-free-banner.component';
import { TenantFreeGalleryComponent } from './components/tenant-free-gallery/tenant-free-gallery.component';
import { TenantCastComponent } from './components/tenant-cast/tenant-cast.component';
import { TenantFreeImageComponent } from './components/tenant-free-image/tenant-free-image.component';
import { TenantRankingComponent } from './components/tenant-ranking/tenant-ranking.component';
import { TenantCourseDetailComponent } from './components/tenant-course-detail/tenant-course-detail.component';
import { TenantFreeSpaceDetailComponent } from './components/tenant-free-space-detail/tenant-free-space-detail.component';
import { TenantFreeBlockDetailComponent } from './components/tenant-free-block-detail/tenant-free-block-detail.component';
import { TenantStaffDetailComponent } from './components/tenant-staff-detail/tenant-staff-detail.component';
import { TenantFreeBannerDetailComponent } from './components/tenant-free-banner-detail/tenant-free-banner-detail.component';
import { TenantFreeGalleryDetailComponent } from './components/tenant-free-gallery-detail/tenant-free-gallery-detail.component';
import { TenantCastDetailComponent } from './components/tenant-cast-detail/tenant-cast-detail.component';
import { TenantFreeImageDetailComponent } from './components/tenant-free-image-detail/tenant-free-image-detail.component';
import { TenantRankingDetailComponent } from './components/tenant-ranking-detail/tenant-ranking-detail.component';
import { TenantCourseCreateComponent } from './components/tenant-course-create/tenant-course-create.component';
import { TenantFreeSpaceCreateComponent } from './components/tenant-free-space-create/tenant-free-space-create.component';
import { TenantFreeBlockCreateComponent } from './components/tenant-free-block-create/tenant-free-block-create.component';
import { TenantStaffCreateComponent } from './components/tenant-staff-create/tenant-staff-create.component';
import { TenantFreeBannerCreateComponent } from './components/tenant-free-banner-create/tenant-free-banner-create.component';
import { TenantFreeGalleryCreateComponent } from './components/tenant-free-gallery-create/tenant-free-gallery-create.component';
import { TenantCastCreateComponent } from './components/tenant-cast-create/tenant-cast-create.component';
import { TenantFreeImageCreateComponent } from './components/tenant-free-image-create/tenant-free-image-create.component';
import { TenantRankingCreateComponent } from './components/tenant-ranking-create/tenant-ranking-create.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { TenantFreeBannerImagesComponent } from './components/tenant-free-banner-images/tenant-free-banner-images.component';
import { TenantCastScheduleSettingComponent } from './components/tenant-cast-schedule-setting/tenant-cast-schedule-setting.component';
import { TenantCastScheduleComponent } from './components/tenant-cast-schedule/tenant-cast-schedule.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TenantCastScheduleDialogComponent } from './components/tenant-cast-schedule-dialog/tenant-cast-schedule-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TenantCastScheduleStandByStatusComponent } from './components/tenant-cast-schedule-stand-by-status/tenant-cast-schedule-stand-by-status.component';
import { TenantCastScheduleStandByStatusDialogComponent } from './components/tenant-cast-schedule-stand-by-status-dialog/tenant-cast-schedule-stand-by-status-dialog.component';


@NgModule({
  declarations: [
    TenantDashboardContainerComponent,
    TenantAppContainerComponent,
    TenantLoginComponent,
    TenantBasicEditComponent,
    TenantCourseComponent,
    TenantTransportationComponent,
    TenantOptionComponent,
    TenantFreeSpaceComponent,
    TenantFreeBlockComponent,
    TenantStaffComponent,
    TenantFreeBannerComponent,
    TenantFreeGalleryComponent,
    TenantCastComponent,
    TenantFreeImageComponent,
    TenantRankingComponent,
    TenantCourseDetailComponent,
    TenantFreeSpaceDetailComponent,
    TenantFreeBlockDetailComponent,
    TenantStaffDetailComponent,
    TenantFreeBannerDetailComponent,
    TenantFreeGalleryDetailComponent,
    TenantCastDetailComponent,
    TenantFreeImageDetailComponent,
    TenantRankingDetailComponent,
    TenantCourseCreateComponent,
    TenantFreeSpaceCreateComponent,
    TenantFreeBlockCreateComponent,
    TenantStaffCreateComponent,
    TenantFreeBannerCreateComponent,
    TenantFreeGalleryCreateComponent,
    TenantCastCreateComponent,
    TenantFreeImageCreateComponent,
    TenantRankingCreateComponent,
    TenantFreeBannerImagesComponent,
    TenantCastScheduleSettingComponent,
    TenantCastScheduleComponent,
    TenantCastScheduleDialogComponent,
    TenantCastScheduleStandByStatusComponent,
    TenantCastScheduleStandByStatusDialogComponent,
  ],
    imports: [
        CommonModule,
        TenantRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatRippleModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        CommonComponentsModule,
        CKEditorModule,
        MatPaginatorModule,
        MatDialogModule,
    ],
})
export class TenantModule {
}
