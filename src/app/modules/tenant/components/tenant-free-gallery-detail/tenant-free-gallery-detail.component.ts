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
import { maxLength40Validator, maxLength500Validator } from 'src/app/validators/common-validators';
import { map, mergeMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { TenantFreeGalleryService } from 'src/app/services/tenant/api/tenant-free-gallery.service';

@Component({
  selector: 'app-tenant-free-gallery-detail',
  templateUrl: './tenant-free-gallery-detail.component.html',
  styleUrls: [ './tenant-free-gallery-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeGalleryDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  fg = new FormGroup({
    publish: new FormControl('1'),
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    comment: new FormControl('', [ maxLength500Validator ]),
  });
  id$ = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('freeGalleryId') ?? '', 10)));
  detail$ = new Subject<any>();

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
    this.s.add(
      this.id$.pipe(
        mergeMap(id => this.tenantFreeGalleryService.get(id)),
      )
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$.subscribe(res => {
        this.fg.patchValue({
          ...res,
          publish: res.publish_at !== null ? '1' : '0',
        }, { emitEvent: true });

        this.fileUrls = null;
        if (res.images) {
          this.files = res.images.map((i: { id: number; file_url: string }) => i.id);
          this.fileUrls = res.images.map((i: { id: number; file_url: string }) => this.domSanitizer.sanitize(SecurityContext.URL, i.file_url));
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
      this.tenantFreeGalleryService.modify(id, req)
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
