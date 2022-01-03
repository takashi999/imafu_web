import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { filter, first, map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FreeBannerImageCastLinkTypes, FreeBannerImageTenantLinkTypes } from 'src/app/services/tenant/api/responses';
import { OperationMasterService } from 'src/app/services/operation/api/operation-master.service';
import {
  OperationTenantBannerImageBase,
  OperationTenantCast,
  OperationTenantForeignLink,
  OperationTenantFreeGallery,
} from 'src/app/services/operation/api/responses';

@Component({
  selector: 'app-operation-tenant-banner-image',
  templateUrl: './operation-tenant-banner-image.component.html',
  styleUrls: [ './operation-tenant-banner-image.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OperationTenantBannerImageComponent),
    },
  ],
})
export class OperationTenantBannerImageComponent implements OnInit, OnDestroy, ControlValueAccessor {

  s = new Subscription();
  file: File | null = null;
  fileUrl: SafeResourceUrl | null = null;
  id: number | null = null;
  disabled = false;
  tenantLinkTypes$ = new BehaviorSubject<FreeBannerImageTenantLinkTypes | null>(null);
  keepImage = false;

  linkForm = new FormControl('');
  fg = new FormGroup({
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

  tenantLinkTypesSelects$ = this.tenantLinkTypes$
    .pipe(
      map(res => res?.map(r => ({ value: r.id.toString(10), label: r.display_name })) ?? null),
    );
  castsSelects: { value: string; label: string }[] = [];
  galleriesSelects: { value: string; label: string }[] = [];
  foreignLinkSelects: { value: string; label: string }[] = [];
  castLinkTypesSelects: { value: string; label: string; }[] = [];
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

  castLinkTypes$ = new BehaviorSubject<FreeBannerImageCastLinkTypes | null>(null);
  castLinkTypeEnabled: boolean = false;
  freeGalleryEnabled: boolean = false;
  foreignLinkEnabled: boolean = false;
  private _casts: OperationTenantCast[] = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private operationMasterService: OperationMasterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  @Input() set foreignLinks(val: OperationTenantForeignLink[] | null | undefined) {
    this.foreignLinkSelects = val?.map(r => ({ value: r.id.toString(10), label: r.link_address })) ?? [];
  }

  @Input() set galleries(val: OperationTenantFreeGallery[] | null | undefined) {
    this.galleriesSelects = val?.map(r => ({ value: r.id.toString(10), label: r.title })) ?? [];
  }

  get casts() {
    return this._casts;
  }

  @Input() set casts(val: OperationTenantCast[] | null | undefined) {
    this._casts = val ?? [];
    this.castsSelects = val?.map(r => ({ value: r.id.toString(10), label: r.display_name })) ?? [];
    this.checkLinkTypeEnabled(this.fg.value);
  }

  onChange = (v: any) => {
  };
  onTouched = () => {
  };

  ngOnInit(): void {
    this.s.add(
      this.fg.valueChanges
        .subscribe((value: any) => {
          this.checkLinkTypeEnabled(value);

          this.onChange({
            ...value,
            image: this.file,
            keep_image: this.keepImage,
          });
        }),
    );
    this.s.add(
      this.linkForm.valueChanges
        .subscribe((val) => {
          this.fg.reset();

          this.checkLinkTypeEnabled(this.fg.value);
        }),
    );

    this.s.add(
      this.operationMasterService.freeBannerImageTenantLinkTypes().subscribe(res => this.tenantLinkTypes$.next(res)),
    );
    this.s.add(
      this.operationMasterService.freeBannerImageCastLinkTypes().subscribe(res => this.castLinkTypes$.next(res)),
    );
  }

  ngOnDestroy(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: undefined | null | OperationTenantBannerImageBase & {
    keep_image: boolean;
    image: null;
    cast_id?: string;
    cast_link_type_id?: string;
    tenant_link_type_id?: string;
    tenant_free_gallery_id?: string;
    foreign_link_id?: string;
  }): void {
    this.fileUrl = obj?.file_url ?? null;
    this.id = obj?.id ?? null;
    this.keepImage = typeof obj?.file_url !== undefined;

    this.fg.patchValue(obj ?? {});
    this.linkForm.setValue(typeof obj?.tenant_link_type_id !== 'undefined' ?
      'tenant' :
      typeof obj?.cast_id !== 'undefined' ?
        'cast' :
        '', { emitEvent: false });
    this.checkLinkTypeEnabled(this.fg.value);
  }

  onChangeFile(file: File | null) {
    if (file !== null) {
      this.file = file;

      this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      this.id = null;
      this.keepImage = false;

      this.onChange({
        ...this.fg.value,
        image: file,
        keep_image: this.keepImage,
      });
    }
  }

  onDeleteFile() {
    this.file = null;
    this.fileUrl = null;
    this.id = null;
    this.keepImage = false;
    this.fg.reset();
    this.linkForm.setValue('');
    this.onChange({
      ...this.fg.value,
      image: this.file,
      keep_image: this.keepImage,
    });
  }

  private checkLinkTypeEnabled(value: any) {
    this.s.add(
      this.castLinkTypes$.pipe(filter(v => v !== null), first())
        .pipe(
          map((types) => {
            const normalSelects = types?.map(t => ({ value: t.id.toString(10), label: t.display_name })) ?? [];
            const withoutPhotoDiary = types?.filter(t => t.type_id !== 'photo_diary').map(t => ({
              value: t.id.toString(10),
              label: t.display_name,
            })) ?? [];

            if (value.cast_id !== '') {
              const cast = this.casts?.find(c => c.id === parseInt(value.cast_id, 10));
              if (cast?.is_use_photo_diary ?? false) {
                return normalSelects;
              }
              return withoutPhotoDiary;
            }

            return [];
          }),
        )
        .subscribe(selects => {
          this.castLinkTypesSelects = selects;
          this.changeDetectorRef.markForCheck();
        }),
    );

    this.s.add(
      this.tenantLinkTypes$
        .pipe(
          filter((v): v is Exclude<typeof v, null> => v !== null),
          first(),
        )
        .subscribe(linkTypes => {
          const typeId = linkTypes?.find(t => t.id === parseInt(value.tenant_link_type_id, 10))?.type_id ?? '';

          this.castLinkTypeEnabled = value.cast_id !== '' && value.cast_id !== null;
          this.freeGalleryEnabled = typeId === 'gallery';
          this.foreignLinkEnabled = typeId === 'foreign_link';

          this.changeDetectorRef.markForCheck();
        }),
    );
  }
}
