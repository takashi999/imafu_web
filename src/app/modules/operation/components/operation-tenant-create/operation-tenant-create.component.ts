import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationTenantService } from 'src/app/services/operation/api/operation-tenant.service';
import { OperationCreditCardBrandService } from 'src/app/services/operation/api/operation-credit-card-brand.service';
import {
  maxLength100Validator,
  maxLength15Validator,
  maxLength180Validator,
  maxLength200Validator, maxLength300Validator,
  maxLength30Validator,
  maxLength60Validator,
} from 'src/app/validators/common-validators';
import { OperationTenantGroupService } from 'src/app/services/operation/api/operation-tenant-group.service';
import { map } from 'rxjs/operators';
import { OperationMasterService } from 'src/app/services/operation/api/operation-master.service';

@Component({
  selector: 'app-operation-tenant-create',
  templateUrl: './operation-tenant-create.component.html',
  styleUrls: [ './operation-tenant-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantCreateComponent implements OnInit, OnDestroy {
  s = new Subscription();
  brands: { id: number; name: string; }[] = [];
  hidePassword = true;

  fg = new FormGroup({
    group: new FormControl('', []),
    name: new FormControl('', [ Validators.required, maxLength100Validator ]),
    tenant_sector_id: new FormControl('', [ Validators.required ]),
    support_regions: new FormControl([], []),
    tenant_plan_id: new FormControl('', []),
    begin_plan_limit_date: new FormControl('', []),
    end_plan_limit_date: new FormControl('', []),
    plan_price: new FormControl('0', []),
    begin_publish_date: new FormControl('', [ Validators.required ]),
    end_publish_date: new FormControl('', []),
    refresh_place_rate_limit_per_date: new FormControl('20', []),
    shop_news_rate_limit_per_date: new FormControl('10', []),
    is_suspend: new FormControl(false, []),
    catch: new FormControl('', [ maxLength300Validator ]),
    tel: new FormArray(Array(2).fill(0).map(() => new FormControl('', [
      maxLength15Validator,
    ])), [ Validators.required ]),
    line_id: new FormControl('', []),
    line_url: new FormControl('', []),
    form_email: new FormControl('', [ Validators.email ]),
    region: new FormControl('', [ maxLength30Validator ]),
    open_time: new FormControl('', [ Validators.required ]),
    open_time_end: new FormControl('', [ Validators.required ]),
    reception_time: new FormControl('', [ Validators.required ]),
    reception_time_end: new FormControl('', []),
    close_date: new FormControl('', [ maxLength60Validator ]),
    lowest_cost: new FormControl('', [ Validators.required ]),
    regular_services: new FormControl('', [ maxLength180Validator ]),
    services: new FormArray(Array(10).fill(0).map(() => new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
    })), []),
    regular_service_price: new FormControl('0', [ Validators.required ]),
    enable_receipt: new FormControl('0', [ Validators.required ]),
    credit_cards: new FormControl([], []),
    note: new FormControl('', [ maxLength200Validator ]),
    use_timetable: new FormControl('0', [ Validators.required ]),
    enable_edit_timetable_on_cast: new FormControl('1', [ Validators.required ]),
    image: new FormControl(null),
    official_site_url: new FormControl(''),
  });
  openTimeCombined = new FormControl([ '', '' ]);
  receptionTimeCombined = new FormControl([ '', '' ]);

  useForm = new FormControl('0');

  creditCardFormControlArray: FormControl[] = [];

  costSelections = [
    { value: 0, label: '4,999円以下' },
    { value: 5000, label: '5,000円-6,999円' },
    { value: 7000, label: '7,000円-9,999円' },
    { value: 10000, label: '10,000円-12,999円' },
    { value: 13000, label: '13,000円-14,999円' },
    { value: 15000, label: '15,000円-16,999円' },
    { value: 17000, label: '17,000円-19,999円' },
    { value: 20000, label: '20,000円-24,999円' },
    { value: 25000, label: '25,000円-29,999円' },
    { value: 30000, label: '30,000円以上' },
  ];

  groupSelects$ = this.operationTenantGroupService.list().pipe(
    map(r => r.map((v): {
      value: any;
      label: string;
    } => ({
      value: v.id.toString(10),
      label: v.name,
    }))),
  );

  sectorSelects$ = this.operationMasterService.sectors().pipe(
    map(r => r.map((v): {
      value: any;
      label: string;
    } => ({
      value: v.id.toString(10),
      label: v.display_name,
    }))),
  );

  regionSelects$ = this.operationMasterService.regions().pipe(
    map(r => r.map((v): {
      value: any;
      label: string;
    } => ({
      value: v.id.toString(10),
      label: v.display_name,
    }))),
  );

  planSelects$ = new BehaviorSubject<{ value: any; label: string; }[] | null>(null);
  isSelectedLimitedPlan = false;

  statusSelects = [
    {
      value: false,
      label: '通常',
    },
    {
      value: true,
      label: '一時停止',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationTenantService: OperationTenantService,
    private operationCreditCardBrandService: OperationCreditCardBrandService,
    private operationTenantGroupService: OperationTenantGroupService,
    private operationMasterService: OperationMasterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get serviceControls(): FormControl[] {
    return (this.fg.get('services') as FormArray).controls as FormControl[];
  }

  ngOnInit(): void {
    this.s.add(
      this.openTimeCombined.valueChanges.subscribe(([ open_time, open_time_end ]) => {
        this.fg.patchValue({
          open_time: open_time,
          open_time_end: open_time_end,
        }, { emitEvent: false });
      }),
    );
    this.s.add(
      this.receptionTimeCombined.valueChanges.subscribe(([ reception_time, reception_time_end ]) => {
        this.fg.patchValue({
          reception_time: reception_time,
          reception_time_end: reception_time_end,
        }, { emitEvent: false });
      }),
    );

    this.s.add(
      this.operationCreditCardBrandService.list()
        .subscribe(res => {
          this.creditCardFormControlArray = [];
          res.forEach((v, i) => {
            const control = new FormControl(false);
            this.creditCardFormControlArray.push(control);

            this.s.add(
              control.valueChanges.subscribe(() => {
                (this.fg.get('credit_cards') as FormControl | null)
                  ?.setValue(
                    res
                      .filter((r, i) => this.creditCardFormControlArray[i].value)
                      .map(r => r.id),
                    { emitEvent: false },
                  );
              }),
            );
          });

          this.brands = res;

          this.changeDetectorRef.markForCheck();
        }),
    );

    this.s.add(
      this.operationMasterService.plans().subscribe(res => {
        this.s.add(
          this.fg.get('tenant_plan_id')?.valueChanges.subscribe(planIdStr => {
            this.isSelectedLimitedPlan = res.find(r => r.id.toString(10) === planIdStr)?.is_limited ?? false;
          }),
        );

        this.planSelects$.next(
          res.map((v): {
            value: any;
            label: string;
          } => ({
            value: v.id.toString(10),
            label: v.display_name,
          })),
        );
      }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.operationTenantService.create({
        ...this.fg.value,
        enable_receipt: this.fg.value === '1',
        use_timetable: this.fg.value === '1',
        enable_edit_timetable_on_cast: this.fg.value === '1',
        form_email: this.useForm.value === '1' ? this.fg.get('form_email')?.value ?? '' : undefined,
      })
        .subscribe((res) => {
          this.router.navigateByUrl('/operation/tenants');
        }),
    );
  }
}
