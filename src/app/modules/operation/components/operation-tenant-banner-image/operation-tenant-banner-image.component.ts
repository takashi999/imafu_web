import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  @Output() markedDeleteImage = new EventEmitter<void>();

  file: File | null = null;
  fileUrl: SafeResourceUrl | null = null;
  id: number | null = null;
  disabled = false;

  constructor(
    private domSanitizer: DomSanitizer,
  ) {
  }

  onChange = (v: any) => {
  };
  onTouched = () => {
  };

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onChange(null);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: undefined | null | {
    id: number;
    file_url: string;
  }): void {
    this.fileUrl = obj?.file_url ?? null;
    this.id = obj?.id ?? null;
  }

  onChangeFile(file: File | null) {
    if (file !== null) {
      this.file = file;

      this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      this.id = null;

      this.onChange(file);
    }
  }

  onDeleteFile() {
    if (this.id !== null) {
      this.markedDeleteImage.emit();
    }

    this.file = null;
    this.fileUrl = null;
    this.id = null;
  }
}
