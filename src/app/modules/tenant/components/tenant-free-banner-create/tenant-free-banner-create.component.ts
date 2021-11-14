import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FreeBannerImageCastLinkTypes,
  FreeBannerImageTenantLinkTypes,
  TenantCast,
} from 'src/app/services/tenant/api/responses';
import { maxLength35Validator, maxLength500Validator } from 'src/app/validators/common-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeBannerService } from 'src/app/services/tenant/api/tenant-free-banner.service';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { TenantFreeGalleryService } from 'src/app/services/tenant/api/tenant-free-gallery.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-free-banner-create',
  templateUrl: './tenant-free-banner-create.component.html',
  styleUrls: [ './tenant-free-banner-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeBannerCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  files: (File | number)[] | null = null;
  fileUrls: SafeUrl[] | null = null;
  imagesMax = 3;

  linkSelects: { value: any; label: string; }[] = [
    {
      value: '',
      label: '指定しない',
    },
    {
      value: 'tenant',
      label: '店舗',
    },
    {
      value: 'cast',
      label: 'キャスト',
    },
  ];
  linkFCs = [ new FormControl('') ];

  displaySpaces$ = this.tenantMasterService.freeBannerDisplaySpaces().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.display_name }))),
  );

  tenantLinkTypes$ = new BehaviorSubject<FreeBannerImageTenantLinkTypes | null>(null);
  tenantLinkTypesSelects$ = this.tenantLinkTypes$
    .pipe(
      map(res => res?.map(r => ({ value: r.id, label: r.display_name })) ?? null),
    );

  casts$ = new BehaviorSubject<TenantCast[] | null>(null);
  castsSelects$ = this.casts$
    .pipe(
      map(res => res?.map(r => ({ value: r.id, label: r.display_name })) ?? null),
    );
  galleries$ = new BehaviorSubject<any[] | null>(null);
  galleriesSelects$ = this.galleries$
    .pipe(
      map(res => res?.map(r => ({ value: r.id, label: r.title })) ?? null),
    );

  castLinkTypes$ = new BehaviorSubject<FreeBannerImageCastLinkTypes | null>(null);
  castLinkTypesSelects: { value: any; label: string; }[][] = [];

  foreignLinks$ = this.tenantMasterService.foreignLinks().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.link_address }))),
  );

  fg = new FormGroup({
    publish: new FormControl('0'),
    title: new FormControl('', [ Validators.required, maxLength35Validator ]),
    tenant_free_banner_display_space_id: new FormControl(''),
    images: new FormArray([]),
  });

  castLinkTypeEnabled: boolean[] = [];
  freeGalleryEnabled: boolean[] = [];
  foreignLinkEnabled: boolean[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeBannerService: TenantFreeBannerService,
    private tenantCastService: TenantCastService,
    private tenantFreeGalleryService: TenantFreeGalleryService,
    private tenantMasterService: TenantMasterService,
    private domSanitizer: DomSanitizer,
    private formDataService: FormDataService,
  ) {
  }

  get imagesFormArray() {
    return this.fg.get('images') as FormArray;
  }

  ngOnInit(): void {
    this.s.add(
      this.fg.get('images')?.valueChanges
        .subscribe(() => {
          this.s.add(
            combineLatest([
              this.castLinkTypes$.pipe(filter(v => v !== null), first()),
              this.casts$.pipe(filter(v => v !== null), first()),
            ]).pipe(
              map(([ types, casts ]) => {
                const normalSelects = types?.map(t => ({ value: t.id, label: t.display_name })) ?? [];
                const withoutPhotoDiary = types?.filter(t => t.type_id !== 'photo_diary').map(t => ({
                  value: t.id,
                  label: t.display_name,
                })) ?? [];

                return (this.fg.get('images')?.value ?? [])
                  .map((v: { cast_id: number | ''; }): { value: any; label: string }[] => {
                    if (v.cast_id !== '') {
                      const cast = casts?.find(c => c.id === v.cast_id);
                      if (cast?.is_use_photo_diary ?? false) {
                        return normalSelects;
                      }
                      return withoutPhotoDiary;
                    }

                    return [];
                  });
              }),
            )
              .subscribe(selects => this.castLinkTypesSelects = selects),
          );

          this.s.add(
            this.tenantLinkTypes$
              .pipe(
                first(),
              )
              .subscribe(linkTypes => {
                this.castLinkTypeEnabled = [];
                this.freeGalleryEnabled = [];
                this.foreignLinkEnabled = [];

                this.imagesFormArray.value.forEach((v: any, i: number) => {
                  const typeId = linkTypes?.find(t => t.id === v.tenant_link_type_id)?.type_id ?? '';

                  this.castLinkTypeEnabled[i] = v.cast_id !== '';
                  this.freeGalleryEnabled[i] = typeId === 'gallery';
                  this.foreignLinkEnabled[i] = typeId === 'foreign_link';
                });
              }),
          );
        }),
    );

    this.s.add(
      this.tenantMasterService.freeBannerImageTenantLinkTypes().subscribe(res => this.tenantLinkTypes$.next(res)),
    );
    this.s.add(
      this.tenantCastService.list().subscribe(res => this.casts$.next(res)),
    );
    this.s.add(
      this.tenantMasterService.freeBannerImageCastLinkTypes().subscribe(res => this.castLinkTypes$.next(res)),
    );
    this.s.add(
      this.tenantFreeGalleryService.list().subscribe(res => this.galleries$.next(res)),
    );
  }

  ngAfterViewInit() {

  }


  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
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
      this.tenantFreeBannerService.create(req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

  onDeleteFile(index: number) {
    this.files = this.files?.filter((f, i) => i !== index) ?? null;
    this.fileUrls = this.fileUrls?.filter((f, i) => i !== index) ?? null;
    this.imagesFormArray.removeAt(index);
  }

  onChangeFile(index: number, file: File | null) {
    if (file && this.fileUrls?.[index] && this.files?.[index]) {
      this.files[index] = file;
      this.fileUrls[index] = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  onChangeFiles(files: FileList | null) {
    if (files) {
      const filesArray = Array.prototype.slice.call(files, 0, this.imagesMax - (this.files?.length ?? 0)) as File[];
      filesArray.forEach(() => {
        this.imagesFormArray.push(this.makeImageFormGroup());
        this.linkFCs.push(new FormControl(''));
      });
      this.files = [ ...this.files ?? [], ...filesArray ];

      if (this.files) {
        this.fileUrls = [ ...this.fileUrls ?? [], ...filesArray.map(f => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f))) ];
      }
    }
  }

  private makeImageFormGroup() {
    return new FormGroup({
      comment: new FormControl('', [ maxLength500Validator ]),
      cast_id: new FormControl(''),
      cast_link_type_id: new FormControl('', [
        (control) =>
          control.parent?.get('cast_id')?.value !== '' ? Validators.required : null,
      ]),
      tenant_link_type_id: new FormControl(''),
      tenant_free_gallery_id: new FormControl('', [], [
        control => this.tenantLinkTypes$.pipe(
          first(),
          map(types => {
            const selectedId = control.parent?.get('tenant_link_type_id')?.value;
            const selected = types?.find(t => t.id === selectedId);

            return selected?.type_id === 'gallery' ? Validators.required : null;
          }),
        ),
      ]),
      foreign_link_id: new FormControl('', [], [
        control => this.tenantLinkTypes$.pipe(
          first(),
          map(types => {
            const selectedId = control.parent?.get('tenant_link_type_id')?.value;
            const selected = types?.find(t => t.id === selectedId);

            return selected?.type_id === 'foreign_link' ? Validators.required : null;
          }),
        ),
      ]),
    });
  }
}
