import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FreeBannerImageCastLinkTypes, FreeBannerImageTenantLinkTypes } from 'src/app/services/tenant/api/responses';
import {
  OperationTenantCast,
  OperationTenantForeignLink,
  OperationTenantFreeGallery,
} from 'src/app/services/operation/api/responses';

@Component({
  selector: 'app-tenant-layout-banner-image',
  templateUrl: './tenant-layout-banner-image.component.html',
  styleUrls: [ './tenant-layout-banner-image.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TenantLayoutBannerImageComponent),
    },
  ],
})
export class TenantLayoutBannerImageComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() castLinkTypes: FreeBannerImageCastLinkTypes | null = null;
  @Output() delete = new EventEmitter<void>();
  s = new Subscription();
  file: File | null = null;
  fileUrl: SafeResourceUrl | null = null;
  disabled = false;
  linkForm = new FormControl('');
  fg = new FormGroup({
    file_path_id: new FormControl(''),
    cast_id: new FormControl(''),
    cast_link_type_id: new FormControl('', [
      (control) =>
        control.parent?.get('cast_id')?.value !== '' ? Validators.required : null,
    ]),
    tenant_link_type_id: new FormControl(''),
    tenant_free_gallery_id: new FormControl('', [
      control => {
        const types = this.tenantLinkTypes;
        const selectedId = control.parent?.get('tenant_link_type_id')?.value;
        const selected = types?.find(t => t.id === selectedId);

        return selected?.type_id === 'gallery' ? Validators.required : null;
      },
    ]),
    foreign_link_id: new FormControl('', [
      control => {
        const types = this.tenantLinkTypes;
        const selectedId = control.parent?.get('tenant_link_type_id')?.value;
        const selected = types?.find(t => t.id === selectedId);

        return selected?.type_id === 'foreign_link' ? Validators.required : null;
      },
    ]),
  });
  tenantLinkTypesSelects: { value: number; label: string; }[] = [];
  castsSelects: { value: number; label: string }[] = [];
  galleriesSelects: { value: number; label: string }[] = [];
  foreignLinkSelects: { value: number; label: string }[] = [];
  castLinkTypesSelects: { value: any; label: string; }[] = [];
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
  castLinkTypeEnabled: boolean = false;
  freeGalleryEnabled: boolean = false;
  foreignLinkEnabled: boolean = false;
  private _casts: OperationTenantCast[] = [];
  private _tenantLinkTypes: FreeBannerImageTenantLinkTypes | null = null;

  constructor(
    private domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get tenantLinkTypes() {
    return this._tenantLinkTypes;
  }

  @Input() set tenantLinkTypes(val: FreeBannerImageTenantLinkTypes | null) {
    this._tenantLinkTypes = val;
    this.tenantLinkTypesSelects = val?.map(r => ({ value: r.id, label: r.display_name })) ?? [];
  }

  @Input() set foreignLinks(val: OperationTenantForeignLink[] | null | undefined) {
    this.foreignLinkSelects = val?.map(r => ({ value: r.id, label: r.link_address })) ?? [];
  }

  @Input() set galleries(val: OperationTenantFreeGallery[] | null | undefined) {
    this.galleriesSelects = val?.map(r => ({ value: r.id, label: r.title })) ?? [];
  }

  get casts() {
    return this._casts;
  }

  @Input() set casts(val: OperationTenantCast[] | null | undefined) {
    this.castsSelects = val?.map(r => ({ value: r.id, label: r.display_name })) ?? [];
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
          });

          this.changeDetectorRef.markForCheck();
        }),
    );
    this.s.add(
      this.linkForm.valueChanges
        .subscribe((val) => {
          this.fg.patchValue({
            cast_id: null,
            cast_link_type_id: null,
            tenant_link_type_id: null,
            tenant_free_gallery_id: null,
            foreign_link_id: null,
          });

          this.checkLinkTypeEnabled(this.fg.value);

          this.changeDetectorRef.markForCheck();
        }),
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

  writeValue(obj: undefined | null | any): void {
    this.fileUrl = obj?.file_url ?? null;

    this.fg.patchValue({
      ...obj,
      file_path_id: obj?.file_path_id ?? null,
    } ?? {});
    this.linkForm.setValue((obj?.tenant_link_type_id ?? null) !== null ?
      'tenant' :
      (obj?.cast_id ?? null) !== null ?
        'cast' :
        '', { emitEvent: false });

    this.changeDetectorRef.markForCheck();
  }

  onChangeFile(file: File | null) {
    if (file !== null) {
      this.file = file;

      this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      this.fg.patchValue({
        file_path_id: null,
      }, { emitEvent: false });

      this.onChange({
        ...this.fg.value,
        image: file,
      });
    }
  }

  onDeleteFile() {
    this.delete.emit();
  }

  private checkLinkTypeEnabled(value: any) {
    const normalSelects = this.castLinkTypes?.map(t => ({ value: t.id, label: t.display_name })) ?? [];
    const withoutPhotoDiary = this.castLinkTypes?.filter(t => t.type_id !== 'photo_diary').map(t => ({
      value: t.id,
      label: t.display_name,
    })) ?? [];
    const typeId = this.tenantLinkTypes?.find(t => t.id === value.tenant_link_type_id)?.type_id ?? '';


    if (value.cast_id !== '') {
      const cast = this.casts?.find(c => c.id === value.cast_id);
      if (cast?.is_use_photo_diary ?? false) {
        this.castLinkTypesSelects = normalSelects;
      }
      this.castLinkTypesSelects = withoutPhotoDiary;
    }
    this.castLinkTypeEnabled = value.cast_id !== '' && value.cast_id !== null;
    this.freeGalleryEnabled = typeId === 'gallery';
    this.foreignLinkEnabled = typeId === 'foreign_link';
  }
}
