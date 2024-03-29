import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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
    keep_image: new FormControl(true),
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

  file: File | null = null;
  defaultFileUrl: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeBlockService: TenantFreeBlockService,
    private tenantMasterService: TenantMasterService,
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
          editable_text_type_id: res.editable_text_type_id.toString(10),
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

        if (res.image?.file_url) {
          this.defaultFileUrl = res.image.file_url;
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
      this.tenantFreeBlockService.modify(id, req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

  onChangeFile(file: File | null) {
    this.file = file;
    if (this.file === null) {
      this.fg.patchValue({
        keep_image: false,
      });
    }
  }

}
