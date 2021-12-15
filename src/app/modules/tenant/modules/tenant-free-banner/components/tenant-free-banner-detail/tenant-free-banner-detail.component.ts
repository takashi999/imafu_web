import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength35Validator } from 'src/app/validators/common-validators';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { TenantFreeBannerService } from 'src/app/services/tenant/api/tenant-free-banner.service';

@Component({
  selector: 'app-tenant-free-banner-detail',
  templateUrl: './tenant-free-banner-detail.component.html',
  styleUrls: [ './tenant-free-banner-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeBannerDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  id$ = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('freeBannerId') ?? '', 10)));
  detail$ = new Subject<any>();
  imagesResult: any[] = [];
  files: (File | number)[] = [];


  displaySpaces$ = this.tenantMasterService.freeBannerDisplaySpaces().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.display_name }))),
  );


  fg = new FormGroup({
    publish: new FormControl(true),
    title: new FormControl('', [ Validators.required, maxLength35Validator ]),
    tenant_free_banner_display_space_id: new FormControl(''),
    images: new FormControl([]),
  });


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeBannerService: TenantFreeBannerService,
    private tenantMasterService: TenantMasterService,
    private formDataService: FormDataService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.id$.pipe(
        mergeMap(id => this.tenantFreeBannerService.get(id)),
      )
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$.subscribe(res => {
        this.imagesResult = res.images;

        this.fg.patchValue({
          ...res,
          publish: res.publish_at !== null ? '1' : '0',
          images: res.images.map((i: any) => ({
            ...i,
            cast_id: i.cast_link?.tenant_cast_id ?? '',
            cast_link_type_id: i.cast_link?.tenant_free_banner_image_cast_link_type_id ?? '',
            tenant_link_type_id: i.tenant_link?.tenant_free_banner_image_tenant_link_type_id ?? '',
            tenant_free_gallery_id: i.tenant_link?.free_gallery_link?.tenant_free_gallery_id ?? '',
            foreign_link_id: i.tenant_link?.free_gallery_link?.tenant_foreign_link_id ?? '',
          })),
        }, { emitEvent: true });
      }),
    );
  }

  ngAfterViewInit() {

  }


  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub(id: number) {
    const req = this.formDataService.getFormData(this.fg.value);

    if (this.files) {
      this.files.forEach((f, i) => {
        if (typeof f === 'number') {
          req.set(`images[${ i }][id]`, f.toString(10));
        } else if (f instanceof File) {
          req.set(`images[${ i }][image]`, f);
        }
      });
    } else {
      req.set('images', '');
    }

    this.s.add(
      this.tenantFreeBannerService.modify(id, req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }
}
