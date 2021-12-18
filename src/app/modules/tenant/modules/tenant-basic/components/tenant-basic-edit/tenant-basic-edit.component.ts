import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tenant } from 'src/app/services/tenant/api/responses';
import { TenantBasicService } from 'src/app/services/tenant/api/tenant-basic.service';
import { TenantCreditCardBrandService } from 'src/app/services/tenant/api/tenant-credit-card-brand.service';
import {
  maxLength15Validator,
  maxLength180Validator,
  maxLength200Validator, maxLength300Validator,
  maxLength30Validator,
  maxLength60Validator,
} from 'src/app/validators/common-validators';

@Component({
  selector: 'app-tenant-basic-edit',
  templateUrl: './tenant-basic-edit.component.html',
  styleUrls: [ './tenant-basic-edit.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantBasicEditComponent implements OnInit, OnDestroy {
  s = new Subscription();
  brands$ = new Subject<{ id: number; name: string; }[]>();
  detail$ = new Subject<Tenant>();

  fg = new FormGroup({
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantBasicService: TenantBasicService,
    private tenantCreditCardBrandService: TenantCreditCardBrandService,
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
      this.tenantBasicService.get()
        .subscribe(res => {
          this.updateByResponse(res);
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  getEndTimeOptions(startHour: string) {
    const parsed = parseInt(startHour, 10);
    const startHourNum = isNaN(parsed) ? 1 : parsed;
    return new Array(24 - startHourNum)
      .fill(0)
      .map((v, i) => `0${ i + 1 + startHourNum }`.substr(-2, 2));
  }

  onSub() {
    this.s.add(
      this.tenantBasicService.modify({
        ...this.fg.value,
        enable_receipt: this.fg.get('enable_receipt')?.value === '1',
        use_timetable: this.fg.get('use_timetable')?.value === '1',
        enable_edit_timetable_on_cast: this.fg.get('enable_edit_timetable_on_cast')?.value === '1',
        form_email: this.useForm.value === '1' ? this.fg.get('form_email')?.value ?? '' : undefined,
        password: this.fg.get('password')?.value ? this.fg.get('password')?.value : null,
      })
        .subscribe((res) => {
          this.updateByResponse(res);
        }),
    );
  }

  private set24Hour(startKey: string, durationKey: string) {
    this.fg.patchValue({
      [startKey]: '00:00',
      [durationKey]: '24:00',
    }, { emitEvent: false });
  }

  private setFromOpenAndClose(startKey: string, durationKey: string, startControl: AbstractControl, endControl: AbstractControl) {
    const startHour = parseInt(startControl.value, 10);
    const endHour = parseInt(endControl.value, 10);

    if (isNaN(startHour) || isNaN(endHour)) {
      this.fg.patchValue({
        [startKey]: ``,
        [durationKey]: ``,
      }, { emitEvent: false });
    } else {
      this.fg.patchValue({
        [startKey]: `${ `0${ startControl.value }`.substr(-2, 2) }:00`,
        [durationKey]: `${ `0${ parseInt(endControl.value, 10) - parseInt(startControl.value, 10) }`.substr(-2, 2) }:00`,
      }, { emitEvent: false });
    }
  }

  private updateByResponse(res: Tenant) {
    this.detail$.next(res);
    this.fg.reset();
    this.fg.patchValue({
      ...res,
      tel: res.tels?.map(t => t.tel),
      line_id: res.line?.line_id,
      line_url: res.line?.line_url,
      form_email: res.form?.email,
      open_time: res.open_time.substr(0, 5),
      open_time_end: res.open_time_end.substr(0, 5),
      reception_time: res.reception_time.substr(0, 5),
      reception_time_end: res.reception_time_end.substr(0, 5),
      services: res.services?.map(s => ({
        name: s.name,
        price: s.price,
      })),
      credit_cards: res.credit_cards?.map(c => c.id),
      enable_receipt: res.enable_receipt ? '1' : '0',
      use_timetable: res.use_timetable ? '1' : '0',
      enable_edit_timetable_on_cast: res.enable_edit_timetable_on_cast ? '1' : '0',
    }, { emitEvent: false });

    this.useForm.setValue(typeof res.form?.email === 'undefined' ? '0' : '1', { emitEvent: false });
    this.openTimeCombined.setValue([ res.open_time.substr(0, 5), res.open_time_end.substr(0, 5) ], { emitEvent: false });
    this.receptionTimeCombined.setValue([ res.reception_time.substr(0, 5), res.reception_time_end.substr(0, 5) ], { emitEvent: false });

    this.s.add(
      this.tenantCreditCardBrandService.list()
        .subscribe(res2 => {
          this.creditCardFormControlArray = [];
          res2.forEach((v, i) => {
            const control = new FormControl(res.credit_cards?.some(c => c.id === v.id));
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

          this.brands$.next(res2);
        }),
    );
  }

}
