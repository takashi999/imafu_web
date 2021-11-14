import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength40Validator, maxLength500Validator } from 'src/app/validators/common-validators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeGalleryService } from 'src/app/services/tenant/api/tenant-free-gallery.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-free-gallery-create',
  templateUrl: './tenant-free-gallery-create.component.html',
  styleUrls: [ './tenant-free-gallery-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeGalleryCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  fg = new FormGroup({
    publish: new FormControl('1'),
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    comment: new FormControl('', [ maxLength500Validator ]),
  });

  files: (File | number)[] | null = null;
  fileUrls: SafeUrl[] | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeGalleryService: TenantFreeGalleryService,
    private tenantMasterService: TenantMasterService,
    private domSanitizer: DomSanitizer,
    private formDataService: FormDataService,
  ) {
  }

  ngOnInit(): void {
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
      this.tenantFreeGalleryService.create(req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

  onDeleteFile(index: number) {
    this.files = this.files?.filter((f, i) => i !== index) ?? null;
    this.fileUrls = this.fileUrls?.filter((f, i) => i !== index) ?? null;
  }

  onChangeFile() {
    const files = Array.prototype.slice.call(this.imageFileInputElm?.nativeElement.files) as File[];
    this.files = [ ...this.files ?? [], ...files ];

    if (this.files) {
      this.fileUrls = [ ...this.fileUrls ?? [], ...files.map(f => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f))) ];
    }
  }

}
