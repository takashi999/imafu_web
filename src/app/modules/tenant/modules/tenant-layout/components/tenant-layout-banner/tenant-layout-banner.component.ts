import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TenantLayoutService } from 'src/app/services/tenant/api/tenant-layout.service';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { TenantFreeGalleryService } from 'src/app/services/tenant/api/tenant-free-gallery.service';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';

@Component({
  selector: 'app-tenant-layout-banner',
  templateUrl: './tenant-layout-banner.component.html',
  styleUrls: [ './tenant-layout-banner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantLayoutBannerComponent implements OnInit, OnDestroy {
  s = new Subscription();

  formArray = new FormArray([]);
  fg = new FormGroup({
    images: this.formArray,
  });

  viewSubject = new BehaviorSubject<{
    details: any;
    freeGalleries: any;
    foreignLinks: any;
    casts: any;
    tenantLinkTypes: any;
    castLinkTypes: any;
  } | null>(null);
  view$ = multicast(this.viewSubject)(forkJoin({
    details: this.tenantLayoutService.listBanners(),
    freeGalleries: this.tenantFreeGalleryService.list(),
    foreignLinks: this.tenantMasterService.foreignLinks(),
    casts: this.tenantCastService.list(),
    tenantLinkTypes: this.tenantMasterService.freeBannerImageTenantLinkTypes(),
    castLinkTypes: this.tenantMasterService.freeBannerImageCastLinkTypes(),
  }));

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantLayoutService: TenantLayoutService,
    private tenantMasterService: TenantMasterService,
    private tenantFreeGalleryService: TenantFreeGalleryService,
    private tenantCastService: TenantCastService,
    private formDataService: FormDataService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(this.view$.connect());
    this.s.add(this.viewSubject.subscribe(res => {
      this.formArray.clear({ emitEvent: false });
      res?.details.forEach((v: any) => {
        this.formArray.push(
          new FormControl({
            file_url: v?.file_url,
            file_path_id: v?.file_path_id,
            image: null,
            cast_id: v?.tenant_banner_image_cast_link?.tenant_cast_id ?? null,
            cast_link_type_id: v?.tenant_banner_image_cast_link?.tenant_free_banner_image_cast_link_type_id ?? null,
            tenant_link_type_id: v?.tenant_banner_image_tenant_link?.tenant_free_banner_image_tenant_link_type_id ?? null,
            tenant_free_gallery_id: v?.tenant_banner_image_free_gallery_link?.tenant_free_gallery_id ?? null,
            foreign_link_id: v?.tenant_banner_image_foreign_link?.tenant_foreign_link_id ?? null,
          }),
          { emitEvent: false },
        );
      });
    }));
  }


  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.tenantLayoutService.modifyBanner(
        this.formDataService.getFormData(
          {
            images: [
              ...this.fg.value.images.map((v: any) => ({
                ...v,
                file_url: undefined,
              })) ?? [],
            ],
          },
        ),
      ).subscribe(res => {
        this.viewSubject.next({
          castLinkTypes: undefined,
          casts: undefined,
          foreignLinks: undefined,
          freeGalleries: undefined,
          tenantLinkTypes: undefined,
          ...this.viewSubject.getValue(),
          details: res
        });
      }),
    );
  }

  onClickAddNewBanner() {
    this.formArray.push(new FormControl({
      file_path_id: null,
      cast_id: null,
      cast_link_type_id: null,
      tenant_link_type_id: null,
      tenant_free_gallery_id: null,
      foreign_link_id: null,
      image: null,
    }));
  }
}
