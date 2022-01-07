import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ValidatorFn } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

type  TimeOption = { hour: string; minutes: { minute: string; res: string; }[]; } | string;

@Component({
  selector: 'app-dashboard-time-select',
  templateUrl: './dashboard-time-select.component.html',
  styleUrls: [ './dashboard-time-select.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTimeSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() label = '';
  @Input() name = '';
  @Input() hasValidatorFn?: (validator: ValidatorFn) => boolean;

  time = new FormControl('00:00');
  hourControl = new FormControl('00');
  minuteControl = new FormControl('00');

  s = new Subscription();

  timeOptions: TimeOption[] = [];
  hourOptions: { value: string; label: string; }[] = [];
  minuteOptions: { value: string; label: string; }[] = [];

  private _insertLast = false;
  private _minuteStep = 60;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input() set insertLast(val: boolean) {
    this._insertLast = val;
    this.setTimeOptions();
  };

  @Input() set minuteStep(val: number) {
    this._minuteStep = val;
    this.setTimeOptions();
  };

  private static valueToWithLabel(value: string) {
    return {
      value,
      label: value === '' ? 'ラスト' : value,
    };
  }

  * getTimes(minuteStep: number, startHour: number, maxHour: number): Generator<TimeOption> {
    let hour = startHour;
    let minute = 0;
    let minutesStack: number[] = [];

    const padZero = (num: number) => `0${ num }`.substr(-2, 2);

    while (hour < maxHour) {
      minutesStack.push(minute);

      minute += minuteStep;

      if (minute >= 60) {
        const hourString = padZero(hour);
        const minuteRemainder = minute % 60;

        yield  {
          hour: hourString,
          minutes: minutesStack.map(m => {
            const minuteString = padZero(m);
            return {
              minute: minuteString,
              res: `${ hourString }:${ minuteString }`,
            };
          }),
        };

        minutesStack = [];
        hour += (minute - minuteRemainder) / 60;
        minute = minuteRemainder;
      }
    }

    const hourString = padZero(hour);

    yield {
      hour: hourString,
      minutes: [ {
        minute: '00',
        res: `${ hourString }:00`,
      } ],
    };
  }

  onChange = (v: any) => {
  };

  onTouched = () => {
  };

  ngOnInit(): void {
    this.setTimeOptions();

    this.s.add(
      merge(
        this.hourControl.valueChanges,
      )
        .subscribe(() => {
          this.selectsAdjust();
        }),
    );
    this.s.add(
      merge(
        this.hourControl.valueChanges,
        this.minuteControl.valueChanges,
      )
        .subscribe(() => {
          this.setFromOpenAndEnd();
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

  writeValue(startTime: string): void {
    const [ startHour, startMinute ] = startTime.split(':');

    this.hourControl.setValue(startHour ?? '', { emitEvent: false });
    this.minuteControl.setValue(startMinute ?? '', { emitEvent: false });

    this.selectsAdjust();
  }

  setDisabledState(isDisabled: boolean) {
    const methodName: 'disable' | 'enable' = isDisabled ? 'disable' : 'enable';
    this.allTimeControlsAction(control => control[methodName]({ emitEvent: false }));
  }

  private setFromOpenAndEnd() {
    this.onChange(this.getTime());
  }

  private getTime() {
    return (this.hourControl.value !== '' && this.minuteControl.value !== '') ?
      this.hourControl.value + ':' + this.minuteControl.value :
      '';
  }

  private allTimeControlsAction(action: (control: FormControl) => void) {
    action(this.hourControl);
    action(this.minuteControl);
  }

  private selectsAdjust() {
    // 分の選択調整
    const isSelectedLast = this.hourControl.value === '' && this._insertLast;
    const methodName = isSelectedLast ? 'disable' : 'enable';

    this.minuteControl[methodName]({ emitEvent: false });
    this.minuteOptions = this.timeOptions.find((v): v is Exclude<typeof v, string> => typeof v !== 'string' && v.hour === this.hourControl.value)?.minutes.map(m => DashboardTimeSelectComponent.valueToWithLabel(m.minute)) ?? [];

    if (this.minuteOptions.every(o => o.value !== this.minuteControl.value)) {
      this.minuteControl.setValue(this.minuteOptions[0]?.value ?? '', { emitEvent: false });
    }
  }

  private setTimeOptions() {
    this.timeOptions = [
      ...this.getTimes(this._minuteStep, 0, 24),
      ...this._insertLast ? [
        '',
      ] : [],
    ];
    this.hourOptions = this.timeOptions.map(v => DashboardTimeSelectComponent.valueToWithLabel(typeof v === 'string' ? '' : v.hour));
  }
}
