import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength100Validator, maxLength500Validator } from 'src/app/validators/common-validators';
import { TenantCast } from 'src/app/services/tenant/api/responses';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantRankingService } from 'src/app/services/tenant/api/tenant-ranking.service';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-ranking-create',
  templateUrl: './tenant-ranking-create.component.html',
  styleUrls: [ './tenant-ranking-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantRankingCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageFileInput') imageFileInputElm?: ElementRef<HTMLInputElement>;

  s = new Subscription();
  file: File | null = null;
  fileUrl: SafeUrl | null = null;

  fg = new FormGroup({
    is_publish_on_top: new FormControl('0'),
    publish: new FormControl('0'),
    title: new FormControl('', [ maxLength100Validator ]),
    comment: new FormControl('', [ maxLength500Validator ]),
    casts: new FormArray([]),
  });
  selectedCast = new FormControl('', [ Validators.required ]);

  topSelects = this.getBooleanStrSelects('公開', '公開しない');

  castsSelects: { value: string; label: string; }[] = [];
  casts: { [id: string]: TenantCast | undefined; } = {};
  castsRaw: TenantCast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantRankingService: TenantRankingService,
    private tenantCastService: TenantCastService,
    private tenantMasterService: TenantMasterService,
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private formDataService: FormDataService,
  ) {
  }

  get castsFormArray() {
    return this.fg.get('casts') as FormArray;
  }

  ngOnInit(): void {
    this.s.add(
      this.tenantCastService.list()
        .subscribe(res => {
          this.castsRaw = res;
          this.castsSelects = this.castsRaw
            .filter(r => !this.castsFormArray.value.some((c: any) => c.id === r.id.toString(10)))
            .map(r => ({
              value: r.id.toString(10),
              label: r.display_name,
            }));

          this.casts = this.castsRaw.reduce((ac, c) => {
            ac[c.id.toString(10)] = c;

            return ac;
          }, {} as { [id: string]: TenantCast | undefined });


          this.changeDetectorRef.markForCheck();
        }),
    );

    this.s.add(
      this.castsFormArray.valueChanges
        .subscribe(res => {
          this.castsSelects = this.castsRaw
            .filter(r => !res.some((c: any) => c.id === r.id.toString(10)))
            .map(r => ({
              value: r.id.toString(10),
              label: r.display_name,
            }));
        }),
    );
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    const req = this.formDataService.getFormData(this.fg.value);

    if (this.file) {
      req.set('thumbnail', this.file);
    }

    this.s.add(
      this.tenantRankingService.create(req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

  onPushCast(id = '') {
    this.castsFormArray.push(new FormGroup({
      id: new FormControl(id, []),
      comment: new FormControl('', [ maxLength100Validator ]),
    }));
  }

  onChangeFile(file: File | undefined) {
    if (file) {
      this.file = file ?? null;
      this.fileUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  onClickAdd() {
    this.onPushCast(this.selectedCast.value);

    this.selectedCast.setValue('', { emitEvent: false });
  }

  private getStringBoolean(bool: boolean) {
    return bool ? '1' : '0';
  }

  private getBooleanStrSelects(trueLabel: string, falseLabel: string, nullLabel?: string): {
    value: string;
    label: string;
  }[] {
    return [
      {
        value: '1',
        label: trueLabel,
      },
      {
        value: '0',
        label: falseLabel,
      },
      ...typeof nullLabel !== 'undefined' ?
        [ {
          value: '',
          label: nullLabel,
        } ] :
        [],
    ];
  }
}
