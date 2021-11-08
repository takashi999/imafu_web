import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tenant } from 'src/app/services/tenant/api/responses';
import { TenantBasicService } from 'src/app/services/tenant/api/tenant-basic.service';
import { TenantCreditCardBrandService } from 'src/app/services/tenant/api/tenant-credit-card-brand.service';

@Component({
  selector: 'app-tenant-basic-edit',
  templateUrl: './tenant-basic-edit.component.html',
  styleUrls: [ './tenant-basic-edit.component.scss' ],
})
export class TenantBasicEditComponent implements OnInit, OnDestroy {
  s = new Subscription();
  brands: { id: number; name: string; }[] = [];
  detail: Tenant | null = null;

  fg = new FormGroup({
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
  openTime = new FormControl('');
  closeTime = new FormControl('');
  open24h = new FormControl(false);
  receptionOpenTime = new FormControl('');
  receptionCloseTime = new FormControl('');
  reception24h = new FormControl(false);
  useForm = new FormControl('0');

  creditCardFormControlArray: FormControl[] = [];

  startTimeOptions = new Array(23)
    .fill(0)
    .map((v, i) => `0${ i + 1 }`.substr(-2, 2));

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
      this.open24h.valueChanges
        .subscribe(res => {
          if (res) {
            this.openTime.disable({ emitEvent: false });
            this.closeTime.disable({ emitEvent: false });
            this.set24Hour('open_time', 'open_time_duration');
          } else {
            this.openTime.enable({ emitEvent: false });
            this.closeTime.enable({ emitEvent: false });
            this.setFromOpenAndClose('open_time', 'open_time_duration', this.openTime, this.closeTime);
          }
        }),
    );
    this.s.add(
      this.reception24h.valueChanges
        .subscribe(res => {
          if (res) {
            this.receptionOpenTime.disable({ emitEvent: false });
            this.receptionCloseTime.disable({ emitEvent: false });
            this.set24Hour('reception_time', 'reception_time_duration');
          } else {
            this.receptionOpenTime.enable({ emitEvent: false });
            this.receptionCloseTime.enable({ emitEvent: false });
            this.setFromOpenAndClose('reception_time', 'reception_time_duration', this.receptionOpenTime, this.receptionCloseTime);
          }
        }),
    );

    this.s.add(
      merge(
        this.openTime.valueChanges,
        this.closeTime.valueChanges,
      ).subscribe(() => {
        this.setFromOpenAndClose('open_time', 'open_time_duration', this.openTime, this.closeTime);
      }),
    );
    this.s.add(
      merge(
        this.receptionOpenTime.valueChanges,
        this.receptionCloseTime.valueChanges,
      ).subscribe(() => {
        this.setFromOpenAndClose('reception_time', 'reception_time_duration', this.receptionOpenTime, this.receptionCloseTime);
      }),
    );


    this.s.add(
      this.tenantBasicService.get()
        .subscribe(res => {
          this.detail = res;
          this.fg.patchValue({
            ...this.detail,
            tel: this.detail.tels?.map(t => t.tel),
            line_id: this.detail.line?.line_id,
            line_url: this.detail.line?.line_id,
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
            use_timetable: this.detail ? '1' : '0',
            enable_edit_timetable_on_cast: this.detail ? '1' : '0',
          }, { emitEvent: false });

          const isOpen24h = this.detail.open_time === '00:00:00' && this.detail.open_time_duration === '24:00:00';
          this.open24h.setValue(isOpen24h, { emitEvent: false });
          if (!isOpen24h) {
            this.openTime.setValue(parseInt(this.detail.open_time.substr(0, 2), 10).toString(10), { emitEvent: false });
            this.closeTime.setValue(
              (
                parseInt(this.detail.open_time, 10) +
                parseInt(this.detail.open_time_duration.substr(0, 2), 10)
              ).toString(10),
              { emitEvent: false },
            );
          } else {
            this.openTime.disable({ emitEvent: false });
            this.closeTime.disable({ emitEvent: false });
          }

          const isReception24h = this.detail.reception_time === '00:00:00' && this.detail.reception_time_duration === '24:00:00';
          this.reception24h.setValue(isReception24h, { emitEvent: false });
          if (!isReception24h) {
            this.receptionOpenTime.setValue(parseInt(this.detail.reception_time.substr(0, 2), 10).toString(10), { emitEvent: false });
            this.receptionCloseTime.setValue(
              (
                parseInt(this.detail.reception_time, 10) +
                parseInt(this.detail.reception_time_duration.substr(0, 2), 10)
              ).toString(10),
              { emitEvent: false },
            );
          } else {
            this.receptionOpenTime.disable({ emitEvent: false });
            this.receptionCloseTime.disable({ emitEvent: false });
          }

          this.useForm.setValue(typeof this.detail.form?.email === 'undefined' ? '0' : '1', { emitEvent: false });

          this.s.add(
            this.tenantCreditCardBrandService.list()
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
                console.log(this.fg.value);
              }),
          );
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
        enable_receipt: this.fg.value === '1',
        use_timetable: this.fg.value === '1',
        enable_edit_timetable_on_cast: this.fg.value === '1',
        form_email: this.useForm.value === '1' ? this.fg.get('form_email')?.value ?? '' : undefined,
        password: this.fg.get('password')?.value ? this.fg.get('password')?.value : null,
      })
        .subscribe((res) => {
          this.router.navigateByUrl('/tenant/basic');
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

}
