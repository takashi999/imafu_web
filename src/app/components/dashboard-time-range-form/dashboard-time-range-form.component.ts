import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-time-range-form',
  templateUrl: './dashboard-time-range-form.component.html',
  styleUrls: [ './dashboard-time-range-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DashboardTimeRangeFormComponent),
    multi: true,
  } ],
})
export class DashboardTimeRangeFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() label: string = '';

  openTime = new FormControl('');
  closeTime = new FormControl('');
  open24h = new FormControl(false);

  s = new Subscription();

  startTimeOptions = new Array(23)
    .fill(0)
    .map((v, i) => `0${ i + 1 }`.substr(-2, 2));

  constructor() {
  }

  onChange = (v: any) => {
  };

  onTouched = () => {
  };

  getEndTimeOptions(startHour: string) {
    const parsed = parseInt(startHour, 10);
    const startHourNum = isNaN(parsed) ? 1 : parsed;
    return new Array(24 - startHourNum)
      .fill(0)
      .map((v, i) => `0${ i + 1 + startHourNum }`.substr(-2, 2));
  }

  ngOnInit(): void {
    this.s.add(
      this.open24h.valueChanges
        .subscribe(res => {
          if (res) {
            this.openTime.disable({ emitEvent: false });
            this.closeTime.disable({ emitEvent: false });
            this.set24Hour();
          } else {
            this.openTime.enable({ emitEvent: false });
            this.closeTime.enable({ emitEvent: false });
            this.setFromOpenAndClose(this.openTime, this.closeTime);
          }
        }),
    );

    this.s.add(
      merge(
        this.openTime.valueChanges,
        this.closeTime.valueChanges,
      ).subscribe(() => {
        this.setFromOpenAndClose(this.openTime, this.closeTime);
      }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: string[]): void {
    const [ openTime, openTimeDuration ] = obj;
    const isOpen24h = openTime === '00:00' && openTimeDuration === '24:00';
    this.open24h.setValue(isOpen24h, { emitEvent: false });
    if (!isOpen24h) {
      this.openTime.setValue(parseInt(openTime.substr(0, 2), 10).toString(10), { emitEvent: false });
      this.closeTime.setValue(
        (
          parseInt(openTime, 10) +
          parseInt(openTimeDuration.substr(0, 2), 10)
        ).toString(10),
        { emitEvent: false },
      );
    } else {
      this.openTime.disable({ emitEvent: false });
      this.closeTime.disable({ emitEvent: false });
    }
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.openTime.disable({ emitEvent: false });
      this.closeTime.disable({ emitEvent: false });
      this.open24h.disable({ emitEvent: false });
    } else {
      this.openTime.enable({ emitEvent: false });
      this.closeTime.enable({ emitEvent: false });
      this.open24h.enable({ emitEvent: false });
    }
  }

  private set24Hour() {
    this.onChange([ '00:00', '24:00' ]);
  }

  private setFromOpenAndClose(startControl: AbstractControl, endControl: AbstractControl) {
    const startHour = parseInt(startControl.value, 10);
    const endHour = parseInt(endControl.value, 10);

    if (isNaN(startHour) || isNaN(endHour)) {
      this.onChange([ '', '' ]);
    } else {
      this.onChange([
        `${ `0${ startControl.value }`.substr(-2, 2) }:00`, '',
        `${ `0${ parseInt(endControl.value, 10) - parseInt(startControl.value, 10) }`.substr(-2, 2) }:00`,
      ]);
    }
  }
}
