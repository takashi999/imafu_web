import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength100Validator } from 'src/app/validators/common-validators';
import { map, mergeMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { TenantFreeImageService } from 'src/app/services/tenant/api/tenant-free-image.service';

@Component({
  selector: 'app-tenant-free-image-detail',
  templateUrl: './tenant-free-image-detail.component.html',
  styleUrls: [ './tenant-free-image-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeImageDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength100Validator ]),
    tenant_free_image_type_id: new FormControl('', []),
  });
  id$ = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('freeImageId') ?? '', 10)));
  detail$ = new Subject<any>();

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
    this.s.add(
      this.id$.pipe(
        mergeMap(id => this.tenantFreeImageService.get(id)),
      )
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$.subscribe(res => {
        this.fg.patchValue({
          ...res,
        }, { emitEvent: true });

        if (res.thumbnail_file_url) {
          this.fileUrl = this.domSanitizer.sanitize(SecurityContext.URL, res.thumbnail_file_url);
        }
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

    if (this.file) {
      req.set('image', this.file);
    }

    this.s.add(
      this.tenantFreeImageService.modify(id, req)
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
