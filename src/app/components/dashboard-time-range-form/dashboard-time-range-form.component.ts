import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

type  TimeOption = { hour: string; minutes: { minute: string; res: string; }[]; } | string;

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

  startTimeHour = new FormControl('06');
  startTimeMinute = new FormControl('00');
  endTimeHour = new FormControl('20');
  endTimeMinute = new FormControl('00');
  open24h = new FormControl(false);

  s = new Subscription();

  startTimeOptions: TimeOption[] = [];
  endTimeOptions: TimeOption[] = [];
  startHourOptions: string[] = [];
  endHourOptions: string[] = [];
  startMinuteOptions: string[] = [];
  endMinuteOptions: string[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  * getTimes(startHour: number, maxHour: number): Generator<TimeOption> {
    let hour = startHour;
    let minute = 0;
    let minutesStack: number[] = [];

    const padZero = (num: number) => `0${ num }`.substr(-2, 2);

    while (hour < maxHour) {
      minutesStack.push(minute);

      minute += this.minuteStep;

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
    this.s.add(
      this.open24h.valueChanges
        .subscribe(res => {
          const methodName: 'disable' | 'enable' = res ? 'disable' : 'enable';
          this.allTimeControlsAction(control => control[methodName]({ emitEvent: false }), true);

          if (res) {
            this.set24Hour();
          } else {
            this.setFromOpenAndEnd();
          }

          this.selectsAdjust();
        }),
    );

    this.s.add(
      merge(
        this.startTimeHour.valueChanges,
        this.startTimeMinute.valueChanges,
        this.endTimeHour.valueChanges,
        this.endTimeMinute.valueChanges,
      )
        .subscribe(() => {
          this.selectsAdjust();
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
    const [ startTime, endTime ] = obj;
    const isOpen24h = startTime.substr(0, 5) === '00:00' && endTime.substr(0, 5) === '24:00';
    this.open24h.setValue(isOpen24h, { emitEvent: false });
    if (!isOpen24h) {
      const [ startHour, startMinute ] = startTime.split(':');
      const [ endHour, endMinute ] = endTime.split(':');

      this.startTimeHour.setValue(startHour, { emitEvent: false });
      this.startTimeMinute.setValue(startMinute, { emitEvent: false });
      this.endTimeHour.setValue(endHour ?? '', { emitEvent: false });
      this.endTimeMinute.setValue(endMinute ?? '', { emitEvent: false });
    } else {
      this.allTimeControlsAction(control => control.disable({ emitEvent: false }), true);
    }

    this.selectsAdjust();
  }

  setDisabledState(isDisabled: boolean) {
    const methodName: 'disable' | 'enable' = isDisabled ? 'disable' : 'enable';
    this.allTimeControlsAction(control => control[methodName]({ emitEvent: false }));
  }

  private set24Hour() {
    this.onChange([ '00:00', '24:00' ]);
  }

  private setFromOpenAndEnd() {
    this.onChange(this.getStartTime());
  }

  private getStartTime() {
    const startTime = this.startTimeHour.value + ':' + this.startTimeMinute.value;
    const endTime = (this.endTimeHour.value !== '' && this.endTimeMinute.value !== '') ?
      this.endTimeHour.value + ':' + this.endTimeMinute.value :
      '';

    return [ `${ startTime }`, `${ endTime }` ];
  }

  private selectsInitialize() {
    this.startTimeOptions = [ ...this.getTimes(0, 24) ];
    this.endTimeOptions = [
      ...this.getTimes(0, 24),
      ...this.insertLast ? [
        '',
      ] : [],
    ];
    this.startHourOptions = this.startTimeOptions.map(v => typeof v === 'string' ? '' : v.hour);
    this.endHourOptions = this.endTimeOptions.map(v => typeof v === 'string' ? '' : v.hour);
    this.startMinuteOptions = this.startTimeOptions.find((v): v is Exclude<typeof v, string> => typeof v !== 'string' && v.hour === this.startTimeHour.value)?.minutes.map(m => m.minute) ?? [];
    this.endMinuteOptions = this.endTimeOptions.find((v): v is Exclude<typeof v, string> => typeof v !== 'string' && v.hour === this.endTimeHour.value)?.minutes.map(m => m.minute) ?? [];
  }

  private allTimeControlsAction(action: (control: FormControl) => void, exclude24HControl = false) {
    action(this.startTimeHour);
    action(this.startTimeMinute);
    action(this.endTimeHour);
    action(this.endTimeMinute);
    if (!exclude24HControl) {
      action(this.open24h);
    }
  }

  private selectsAdjust() {
    const isSelectedLast = this.endTimeHour.value === '' && this.insertLast;

    this.selectsInitialize();

    if (isSelectedLast && this.endTimeMinute.enabled) {
      this.endTimeMinute.disable({ emitEvent: false });
    }

    this.startMinuteOptions = this.startTimeOptions.find((v): v is Exclude<typeof v, string> => typeof v !== 'string' && v.hour === this.startTimeHour.value)?.minutes.map(m => m.minute) ?? [];
    this.endMinuteOptions = this.endTimeOptions.find((v): v is Exclude<typeof v, string> => typeof v !== 'string' && v.hour === this.endTimeHour.value)?.minutes.map(m => m.minute) ?? [];

    if (this.startMinuteOptions.every(o => o !== this.startTimeMinute.value)) {
      this.startTimeMinute.setValue(this.startMinuteOptions[0] ?? '', { emitEvent: false });
    }
    if (this.endMinuteOptions.every(o => o !== this.endTimeMinute.value)) {
      this.endTimeMinute.setValue(this.endMinuteOptions[0] ?? '', { emitEvent: false });
    }

    this.setFromOpenAndEnd();
  }
}
