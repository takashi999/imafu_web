import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-image',
  templateUrl: './dashboard-image.component.html',
  styleUrls: [ './dashboard-image.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardImageComponent implements OnInit, OnDestroy {

  @Output() changeFile: EventEmitter<File> = new EventEmitter();
  rawFileUrl: string | null = null;
  fileUrl: SafeResourceUrl | null = null;

  constructor(
    private domSanitizer: DomSanitizer,
  ) {
  }

  @Input() set defaultUrl(val: string | null) {
    this.setFileUrl(val);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.revoke();
  }

  onChangeFile(files: FileList | null) {
    const file = files?.item(0) ?? null;

    if (file !== null) {
      this.changeFile.emit(file);
      this.setFileUrlByFile(file);
    } else {
      this.setFileUrl(null);
    }
  }

  private revoke() {
    if (this.rawFileUrl !== null) {
      URL.revokeObjectURL(this.rawFileUrl);
    }
  }

  private setFileUrl(val: string | null) {
    if (val !== null) {
      this.revoke();
      this.rawFileUrl = val;
      this.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(val);
    } else {
      this.revoke();
      this.rawFileUrl = null;
      this.fileUrl = null;
    }
  }

  private setFileUrlByFile(file: File) {
    this.setFileUrl(URL.createObjectURL(file));
  }
}
