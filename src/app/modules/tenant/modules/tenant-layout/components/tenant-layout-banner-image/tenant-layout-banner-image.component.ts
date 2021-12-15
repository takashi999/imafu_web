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
import { BehaviorSubject, Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FreeBannerImageCastLinkTypes, FreeBannerImageTenantLinkTypes } from 'src/app/services/tenant/api/responses';
import { filter, first, map } from 'rxjs/operators';
import {
  OperationTenantCast,
  OperationTenantForeignLink,
  OperationTenantFreeGallery,
} from 'src/app/services/operation/api/responses';
import { OperationMasterService } from 'src/app/services/operation/api/operation-master.service';

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

  @Output() delete = new EventEmitter<void>();

  s = new Subscription();
  file: File | null = null;
  fileUrl: SafeResourceUrl | null = null;
  disabled = false;
  tenantLinkTypes$ = new BehaviorSubject<FreeBannerImageTenantLinkTypes | null>(null);

  linkForm = new FormControl('');
  fg = new FormGroup({
    file_path_id: new FormControl(''),
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
      map(res => res?.map(r => ({ value: r.id, label: r.display_name })) ?? null),
    );
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
    this.s.add(
      this.castLinkTypes$.pipe(filter(v => v !== null), first())
        .pipe(
          map((types) => {
            const normalSelects = types?.map(t => ({ value: t.id, label: t.display_name })) ?? [];
            const withoutPhotoDiary = types?.filter(t => t.type_id !== 'photo_diary').map(t => ({
              value: t.id,
              label: t.display_name,
            })) ?? [];

            if (value.cast_id !== '') {
              const cast = this.casts?.find(c => c.id === value.cast_id);
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
          const typeId = linkTypes?.find(t => t.id === value.tenant_link_type_id)?.type_id ?? '';

          this.castLinkTypeEnabled = value.cast_id !== '' && value.cast_id !== null;
          this.freeGalleryEnabled = typeId === 'gallery';
          this.foreignLinkEnabled = typeId === 'foreign_link';

          this.changeDetectorRef.markForCheck();
        }),
    );
  }
}
