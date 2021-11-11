import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationTenantService } from 'src/app/services/operation/api/operation-tenant.service';
import { OperationCreditCardBrandService } from 'src/app/services/operation/api/operation-credit-card-brand.service';
import { OperationTenant } from 'src/app/services/operation/api/responses';
import { OperationTenantUserService } from 'src/app/services/operation/api/operation-tenant-user.service';
import { TenantUser } from 'src/app/services/tenant/api/responses';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';

@Component({
  selector: 'app-operation-tenant-detail',
  templateUrl: './operation-tenant-detail.component.html',
  styleUrls: [ './operation-tenant-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantDetailComponent implements OnInit, OnDestroy {
  s = new Subscription();
  brands: { id: number; name: string; }[] = [];
  id: number | null = null;
  detail: OperationTenant | null = null;
  users$: Subject<TenantUser[]> = new Subject();

  fg = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    catch: new FormControl('', [ Validators.maxLength(30) ]),
    tel: new FormArray(Array(2).fill(0).map(() => new FormControl('', [
      Validators.maxLength(15),
    ])), [ Validators.required ]),
    line_id: new FormControl('', []),
    line_url: new FormControl('', []),
    form_email: new FormControl('', [ Validators.email ]),
    region: new FormControl('', [ Validators.maxLength(30) ]),
    open_time: new FormControl('', [ Validators.required ]),
    open_time_duration: new FormControl('', [ Validators.required ]),
    reception_time: new FormControl('', [ Validators.required ]),
    reception_time_duration: new FormControl('', [ Validators.required ]),
    close_date: new FormControl('', [ Validators.maxLength(60) ]),
    lowest_cost: new FormControl('', [ Validators.required ]),
    regular_services: new FormControl('', [ Validators.maxLength(180) ]),
    services: new FormArray(Array(10).fill(0).map(() => new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
    })), []),
    regular_service_price: new FormControl('0', [ Validators.required ]),
    enable_receipt: new FormControl('0', [ Validators.required ]),
    credit_cards: new FormControl([], []),
    note: new FormControl('', [ Validators.maxLength(200) ]),
    use_timetable: new FormControl('0', [ Validators.required ]),
    enable_edit_timetable_on_cast: new FormControl('1', [ Validators.required ]),
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

  displayUserColumns: TableListColumnType<TenantUser>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'login_id',
      label: 'ログインID',
    },
    {
      key: 'delete',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationTenantService: OperationTenantService,
    private operationCreditCardBrandService: OperationCreditCardBrandService,
    private operationTenantUserService: OperationTenantUserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get serviceControls(): FormControl[] {
    return (this.fg.get('services') as FormArray).controls as FormControl[];
  }

  getUserNameFn = (v: TenantUser) => v.login_id;

  ngOnInit(): void {
    this.s.add(
      this.openTimeCombined.valueChanges.subscribe(([ open_time, open_time_duration ]) => {
        this.fg.patchValue({
          open_time: open_time,
          open_time_duration: open_time_duration,
        }, { emitEvent: false });
      }),
    );
    this.s.add(
      this.receptionTimeCombined.valueChanges.subscribe(([ reception_time, reception_time_duration ]) => {
        this.fg.patchValue({
          reception_time: reception_time,
          reception_time_duration: reception_time_duration,
        }, { emitEvent: false });
      }),
    );

    this.s.add(
      this.activatedRoute.paramMap.subscribe(param => {
        const parsed = parseInt(param.get('tenant_id') ?? '', 10);
        if (isNaN(parsed)) {
          this.router.navigateByUrl('/operation/tenants');
          return;
        }
        this.id = parsed;

        this.s.add(
          this.operationTenantUserService.list(this.id)
            .subscribe(res => {
              this.users$.next(res);
            }),
        );

        this.s.add(
          this.operationTenantService.get(this.id)
            .subscribe(res => {
              this.detail = res;
              this.fg.patchValue({
                ...this.detail,
                tel: this.detail.tels?.map(t => t.tel),
                line_id: this.detail.line?.line_id,
                line_url: this.detail.line?.line_url,
                form_email: this.detail.form?.email,
                open_time: this.detail.open_time.substr(0, 5),
                open_time_duration: this.detail.open_time_duration.substr(0, 5),
                reception_time: this.detail.reception_time.substr(0, 5),
                reception_time_duration: this.detail.reception_time_duration.substr(0, 5),
                services: this.detail.services?.map(s => ({
                  name: s.name,
                  price: s.price,
                })),
                credit_cards: this.detail.credit_cards?.map(c => c.id),
                enable_receipt: this.detail.enable_receipt ? '1' : '0',
                use_timetable: this.detail.use_timetable ? '1' : '0',
                enable_edit_timetable_on_cast: this.detail.enable_edit_timetable_on_cast ? '1' : '0',
              }, { emitEvent: false });

              this.useForm.setValue(typeof this.detail.form?.email === 'undefined' ? '0' : '1', { emitEvent: false });

              this.openTimeCombined.setValue([ this.detail.open_time.substr(0, 5), this.detail.open_time_duration.substr(0, 5) ], { emitEvent: false });
              this.receptionTimeCombined.setValue([ this.detail.reception_time.substr(0, 5), this.detail.reception_time_duration.substr(0, 5) ], { emitEvent: false });

              this.s.add(
                this.operationCreditCardBrandService.list()
                  .subscribe(res2 => {
                    this.creditCardFormControlArray = [];
                    res2.forEach((v, i) => {
                      const control = new FormControl(this.detail?.credit_cards?.some(c => c.id === v.id));
                      this.creditCardFormControlArray.push(control);

                      this.s.add(
                        control.valueChanges.subscribe(() => {
                          (this.fg.get('credit_cards') as FormControl | null)
                            ?.setValue(
                              res2
                                .filter((r, i) => this.creditCardFormControlArray[i].value)
                                .map(r => r.id),
                              { emitEvent: false },
                            );
                        }),
                      );
                    });

                    this.brands = res2;
                    this.changeDetectorRef.markForCheck();
                  }),
              );

              this.changeDetectorRef.markForCheck();
            }),
        );
      }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    if (this.id != null) {
      this.s.add(
        this.operationTenantService.modify(this.id, {
          ...this.fg.value,
          enable_receipt: this.fg.get('enable_receipt')?.value === '1',
          use_timetable: this.fg.get('use_timetable')?.value === '1',
          enable_edit_timetable_on_cast: this.fg.get('enable_edit_timetable_on_cast')?.value === '1',
          form_email: this.useForm.value === '1' ? this.fg.get('form_email')?.value ?? '' : undefined,
        })
          .subscribe((res) => {
            this.router.navigateByUrl('/operation/tenants');
          }),
      );
    }
  }

  onClickUserRow(data: TenantUser) {
    this.router.navigateByUrl(`/operation/tenants/${ data.tenant_id }/users/${ data.id }`);
  }

  onDeleteUser(data: TenantUser) {
    this.operationTenantUserService.delete(data.tenant_id, data.id)
      .subscribe(res => {
        this.users$.next(res);
      });
  }
}
