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
import {
  maxLength100000Validator,
  maxLength35Validator,
  maxLength500Validator,
} from 'src/app/validators/common-validators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeBlockService } from 'src/app/services/tenant/api/tenant-free-block.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-free-block-create',
  templateUrl: './tenant-free-block-create.component.html',
  styleUrls: [ './tenant-free-block-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeBlockCreateComponent implements OnInit, OnDestroy, AfterViewInit {
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
      this.tenantFreeBlockService.create(req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

  onChangeFile(file: File | null) {
    this.file = file;
  }

}
