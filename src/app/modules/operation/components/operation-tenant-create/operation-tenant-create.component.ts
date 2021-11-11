import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationTenantService } from 'src/app/services/operation/api/operation-tenant.service';
import { OperationCreditCardBrandService } from 'src/app/services/operation/api/operation-credit-card-brand.service';

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
  openTimeCombined = new FormControl(['',""]);
  receptionTimeCombined = new FormControl(['',""]);

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
    private operationTenantService: OperationTenantService,
    private operationCreditCardBrandService: OperationCreditCardBrandService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get serviceControls(): FormControl[] {
    return (this.fg.get('services') as FormArray).controls as FormControl[];
  }

  ngOnInit(): void {
    this.s.add(
      this.openTimeCombined.valueChanges.subscribe(([open_time, open_time_duration])=>{
        this.fg.patchValue({
          open_time: open_time,
          open_time_duration: open_time_duration,
        }, { emitEvent: false });
      })
    )
    this.s.add(
      this.receptionTimeCombined.valueChanges.subscribe(([reception_time, reception_time_duration])=>{
        this.fg.patchValue({
          reception_time: reception_time,
          reception_time_duration: reception_time_duration,
        }, { emitEvent: false });
      })
    )

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
