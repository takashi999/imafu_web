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
import { map, mergeMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  maxLength100000Validator,
  maxLength35Validator,
  maxLength500Validator,
} from 'src/app/validators/common-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { TenantFreeBlockService } from 'src/app/services/tenant/api/tenant-free-block.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-free-block-detail',
  templateUrl: './tenant-free-block-detail.component.html',
  styleUrls: [ './tenant-free-block-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeBlockDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  fg = new FormGroup({
    publish_at: new FormControl(''),
    tenant_free_block_display_type_id: new FormControl(''),
    tenant_free_block_display_space_id: new FormControl(''),
    title: new FormControl('', [ Validators.required, maxLength35Validator ]),
    editable_text_type_id: new FormControl('', []),
    content: new FormControl('', [ maxLength100000Validator ]),
    note: new FormControl('', [ maxLength500Validator ]),
  });
  id$ = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('freeBlockId') ?? '', 10)));
  detail$ = new Subject<any>();
  publishSelects = [
    {
      value: '9999-12-31 00:00:00',
      label: '公開前',
    },
    {
      value: `${ this.currentDate.getFullYear() }-${ this.currentDate.getMonth() + 1 }-${ this.currentDate.getDate() }`,
      label: '公開',
    },
    {
      value: '',
      label: '非公開',
    },
  ];

  displayType$ = this.tenantMasterService.freeBlockDisplayTypes().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.display_name }))),
  );
  displaySpace$ = this.tenantMasterService.freeBlockDisplaySpaces().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.display_name }))),
  );

  textTypeSelects: { value: any; label: string }[] | null = null;
  selectedTextType: string | null = null;

  file: File | null = null;
  fileUrl: SafeUrl | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeBlockService: TenantFreeBlockService,
    private tenantMasterService: TenantMasterService,
    private domSanitizer: DomSanitizer,
    private formDataService: FormDataService,
  ) {
  }

  get currentDate() {
    return new Date();
  }

  ngOnInit(): void {
    this.s.add(
      this.id$.pipe(
        mergeMap(id => this.tenantFreeBlockService.get(id)),
      )
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$.subscribe(res => {
        this.fg.patchValue({
          ...res,
          publish_at: res.publish_at ?? '',
        }, { emitEvent: true });

        if (res.publish_at) {
          this.publishSelects = [
            {
              value: '9999-12-31 00:00:00',
              label: '公開前',
            },
            {
              value: res.publish_at,
              label: '公開',
            },
            {
              value: '',
              label: '非公開',
            },
          ];
        }

        if (res.image.file_url) {
          this.fileUrl = this.domSanitizer.sanitize(SecurityContext.URL, res.image.file_url);
        }
      }),
    );

    this.s.add(
      this.tenantMasterService.editableTextTypes()
        .subscribe(res => {
          this.textTypeSelects = res.map(r => ({
            value: r.id,
            label: { plain: 'プレーンテキスト', html: 'HTML' }[r.type] + '形式',
          }));

          this.selectedTextType = res.find(r => r.id === this.fg.get('editable_text_type_id')?.value)?.type ?? 'plain';
          this.s.add(
            this.fg.get('editable_text_type_id')?.valueChanges
              .subscribe((id) => {
                this.selectedTextType = res.find(r => r.id === id)?.type ?? 'plain';
              }),
          );
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
      this.tenantFreeBlockService.modify(id, req)
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
