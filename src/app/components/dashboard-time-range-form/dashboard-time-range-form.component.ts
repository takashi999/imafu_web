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
  @Input() enable24h = true;
  @Input() minuteStep = 60;
  @Input() insertLast = false;

  openTime = new FormControl('');
  closeTime = new FormControl('');
  open24h = new FormControl(false);

  s = new Subscription();

  startTimeOptions: string[] = [];
  endTimeOptions: string[] = [];

  constructor() {
  }

  * getTimes(startHour: number, maxHour: number) {
    let hour = startHour;
    let minute = 0;

    const padZero = (str: number) => `0${ str }`.substr(-2, 2);

    while (hour < maxHour) {
      yield `${ padZero(hour) }:${ padZero(minute) }`;

      minute += this.minuteStep;

      if (minute >= 60) {
        const minuteRemainder = minute % 60;
        hour += (minute - minuteRemainder) / 60;
        minute = minuteRemainder;
      }
    }
    yield `${ padZero(hour) }:00`;
  }

  onChange = (v: any) => {
  };

  onTouched = () => {
  };

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

    this.startTimeOptions = [ ...this.getTimes(0, 24) ];
    this.endTimeOptions = [
      ...this.getTimes(1, 24),
      ...this.insertLast ? [
        '',
      ] : [],
    ];
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
    const [ openTime, endTime ] = obj;
    const isOpen24h = openTime.substr(0, 5) === '00:00' && endTime.substr(0, 5) === '24:00';
    this.open24h.setValue(isOpen24h, { emitEvent: false });
    if (!isOpen24h) {
      this.openTime.setValue(openTime.substr(0, 5), { emitEvent: false });
      this.closeTime.setValue(endTime.substr(0, 5), { emitEvent: false });
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
    this.onChange([
      startControl.value,
      endControl.value,
    ]);
  }
}
