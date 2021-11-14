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
import { maxLength100Validator, maxLength35Validator } from 'src/app/validators/common-validators';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeImageService } from 'src/app/services/tenant/api/tenant-free-image.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-free-image-create',
  templateUrl: './tenant-free-image-create.component.html',
  styleUrls: [ './tenant-free-image-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeImageCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength100Validator ]),
    tenant_free_image_type_id: new FormControl('', []),
  });

  imageType$ = this.tenantMasterService.freeImageTypes().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.display_name }))),
  );

  file: File | null = null;
  fileUrl: SafeUrl | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeImageService: TenantFreeImageService,
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

    if (this.file) {
      req.set('image', this.file);
    }

    this.s.add(
      this.tenantFreeImageService.create(req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

  onChangeFile() {
    this.file = this.imageFileInputElm?.nativeElement.files?.[0] ?? null;
    this.fileUrl = null;

    if (this.file) {
      this.fileUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.file));
    }
  }

}
