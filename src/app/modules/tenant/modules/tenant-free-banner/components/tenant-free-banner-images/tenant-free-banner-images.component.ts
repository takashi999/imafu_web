import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import {
  FreeBannerImageCastLinkTypes,
  FreeBannerImageTenantLinkTypes,
  TenantCast,
  TenantFreeBannerImage,
} from 'src/app/services/tenant/api/responses';
import { filter, first, map } from 'rxjs/operators';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { maxLength500Validator } from 'src/app/validators/common-validators';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { TenantFreeGalleryService } from 'src/app/services/tenant/api/tenant-free-gallery.service';

@Component({
  selector: 'app-tenant-free-banner-images',
  templateUrl: './tenant-free-banner-images.component.html',
  styleUrls: [ './tenant-free-banner-images.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TenantFreeBannerImagesComponent),
    },
  ],
})
export class TenantFreeBannerImagesComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Output() changeFiles = new EventEmitter<(File | number)[]>();

  s = new Subscription();

  files: (File | number)[] = [];
  fileUrls: SafeResourceUrl[] = [];
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
  linkFormArray = new FormArray([]);
  imagesFormArray = new FormArray([]);
  fg = new FormGroup({
    images: this.imagesFormArray,
  });

  tenantLinkTypes$ = new BehaviorSubject<FreeBannerImageTenantLinkTypes | null>(null);
  tenantLinkTypesSelects$ = this.tenantLinkTypes$
    .pipe(
      map(res => res?.map(r => ({ value: r.id.toString(10), label: r.display_name })) ?? null),
    );

  casts$ = new BehaviorSubject<TenantCast[] | null>(null);
  castsSelects$ = this.casts$
    .pipe(
      map(res => res?.map(r => ({ value: r.id.toString(10), label: r.display_name })) ?? null),
    );
  galleries$ = new BehaviorSubject<any[] | null>(null);
  galleriesSelects$ = this.galleries$
    .pipe(
      map(res => res?.map(r => ({ value: r.id.toString(10), label: r.title })) ?? null),
    );

  castLinkTypes$ = new BehaviorSubject<FreeBannerImageCastLinkTypes | null>(null);
  castLinkTypesSelects: { value: any; label: string; }[][] = [];

  foreignLinks$ = this.tenantMasterService.foreignLinks().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.link_address }))),
  );

  castLinkTypeEnabled: boolean[] = [];
  freeGalleryEnabled: boolean[] = [];
  foreignLinkEnabled: boolean[] = [];

  constructor(
    private tenantMasterService: TenantMasterService,
    private domSanitizer: DomSanitizer,
    private tenantCastService: TenantCastService,
    private tenantFreeGalleryService: TenantFreeGalleryService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {
  }

  onChange = (v: any) => {
  };
  onTouched = () => {
  };


  ngOnInit(): void {
    this.s.add(
      this.imagesFormArray.valueChanges
        .subscribe((values: any[]) => {
          this.checkLinkTypeEnabled(values);

          this.onChange(values);
          this.changeFiles.emit(this.files);
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

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  getLinkFormArrayAt(index: number) {
    return this.linkFormArray.at(index) as FormControl;
  }

  onDeleteFile(index: number) {
    this.files = this.files?.filter((f, i) => i !== index) ?? null;
    this.fileUrls = this.fileUrls?.filter((f, i) => i !== index) ?? null;
    this.imagesFormArray.removeAt(index, { emitEvent: false });

    this.onChange(this.imagesFormArray.value);
    this.changeFiles.emit(this.files);
  }

  onChangeFile(index: number, file: File | null) {
    if (file && this.fileUrls?.[index] && this.files?.[index]) {
      this.files[index] = file;
      this.fileUrls[index] = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
    this.onChange(this.imagesFormArray.value);
    this.changeFiles.emit(this.files);
  }

  onChangeFiles(files: FileList | null) {
    if (files) {
      const filesArray = Array.prototype.slice.call(files, 0, this.imagesMax - (this.files?.length ?? 0)) as File[];
      this.formArraysInit(filesArray.map(() => null));
      this.files = [ ...this.files ?? [], ...filesArray ];

      if (this.files) {
        this.fileUrls = [ ...this.fileUrls ?? [], ...filesArray.map(f => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f))) ];
      }
    }
    this.onChange(this.imagesFormArray.value);
    this.changeFiles.emit(this.files);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onChange(this.imagesFormArray.value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.imagesFormArray[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

  writeValue(val: TenantFreeBannerImage[]): void {
    this.imagesFormArray.clear();
    this.linkFormArray.clear();

    this.formArraysInit(val);

    this.fileUrls = [];
    if (val) {
      this.files = val.map((i: { id: number; file_url: string }) => i.id);
      this.fileUrls = val.map((i: { id: number; file_url: string }): SafeResourceUrl => this.domSanitizer.bypassSecurityTrustResourceUrl(i.file_url));
    }
    this.changeFiles.emit(this.files);

    this.checkLinkTypeEnabled(this.imagesFormArray.value);
  }

  private formArraysInit(value: (TenantFreeBannerImage | null)[]) {
    value.forEach((v,i) => {
      const imageForm = this.makeImageFormGroup();
      const linkFormValue = v !== null ?
        v.tenant_link !== null ?
          'tenant' :
          v.cast_link !== null ?
            'cast' :
            '' :
        '';
      const linkForm = new FormControl(linkFormValue);

      this.s.add(linkForm.valueChanges.subscribe(()=>{
        this.imagesFormArray.at(i)?.setValue(this.makeImageFormGroup().value);
      }))

      this.imagesFormArray.push(imageForm, { emitEvent: false });
      this.linkFormArray.push(linkForm, { emitEvent: false });

      if (v !== null) {
        imageForm.patchValue({
          comment: v.comment,
          cast_id: v.cast_link?.tenant_cast_id.toString(10),
          cast_link_type_id: v.cast_link?.tenant_free_banner_image_cast_link_type.id.toString(10),
          tenant_link_type_id: v.tenant_link?.tenant_free_banner_image_tenant_link_type_id.toString(10),
          tenant_free_gallery_id: v.tenant_free_banner_image_free_gallery_link?.tenant_free_gallery_id.toString(10),
          foreign_link_id: v.tenant_free_banner_image_foreign_link?.tenant_free_banner_image_tenant_link_id.toString(10),
        }, { emitEvent: false });
      }
    });
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

  private checkLinkTypeEnabled(values: any[]) {
    this.s.add(
      combineLatest([
        this.castLinkTypes$.pipe(filter(v => v !== null), first()),
        this.casts$.pipe(filter(v => v !== null), first()),
      ]).pipe(
        map(([ types, casts ]) => {
          const normalSelects = types?.map(t => ({ value: t.id.toString(10), label: t.display_name })) ?? [];
          const withoutPhotoDiary = types?.filter(t => t.type_id !== 'photo_diary').map(t => ({
            value: t.id.toString(10),
            label: t.display_name,
          })) ?? [];

          return (values ?? [])
            .map((v: { cast_id: string; }): { value: any; label: string }[] => {
              if (v.cast_id !== '') {
                const cast = casts?.find(c => c.id.toString(10) === v.cast_id);
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
          filter((v): v is Exclude<typeof v, null> => v !== null),
          first(),
        )
        .subscribe(linkTypes => {
          this.castLinkTypeEnabled = [];
          this.freeGalleryEnabled = [];
          this.foreignLinkEnabled = [];

          values.forEach((v: any, i: number) => {
            const typeId = linkTypes?.find(t => t.id.toString(10) === v.tenant_link_type_id)?.type_id ?? '';

            this.castLinkTypeEnabled[i] = v.cast_id !== '';
            this.freeGalleryEnabled[i] = typeId === 'gallery';
            this.foreignLinkEnabled[i] = typeId === 'foreign_link';
          });
        }),
    );
  }
}
