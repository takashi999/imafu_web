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
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-time-range-form',
  templateUrl: './dashboard-time-range-form.component.html',
  styleUrls: [ './dashboard-time-range-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTimeRangeFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() label: string = '';
  @Input() enable24h = true;
  @Input() insertLast = false;
  @Input() minuteStep = 60;

  open24h = new FormControl(false);

  startTimeControl = new FormControl('06:00');
  endTimeControl = new FormControl('20:00');

  s = new Subscription();


  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
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
        }),
    );

    this.s.add(
      merge(
        this.startTimeControl.valueChanges,
        this.endTimeControl.valueChanges,
      )
        .subscribe(() => {
          const is24h = this.startTimeControl.value === '00:00' && this.endTimeControl.value === '24:00';
          if (is24h && this.enable24h) {
            this.open24h.setValue(true, { emitEvent: false });
            this.allTimeControlsAction(control => control.disable({ emitEvent: false }), true);
            this.set24Hour();
          } else {
            this.setFromOpenAndEnd();
          }
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
    const methodName: 'disable' | 'enable' = isOpen24h ? 'disable' : 'enable';

    this.open24h.setValue(isOpen24h, { emitEvent: false });

    this.startTimeControl.setValue(obj[0], { emitEvent: false });
    this.endTimeControl.setValue(obj[1], { emitEvent: false });

    this.allTimeControlsAction(control => control[methodName]({ emitEvent: false }), true);

    this.changeDetectorRef.markForCheck();
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
    const startTime = this.startTimeControl.value;
    const endTime = this.endTimeControl.value;

    return [ `${ startTime }`, `${ endTime }` ];
  }

  private allTimeControlsAction(action: (control: FormControl) => void, exclude24HControl = false) {
    action(this.startTimeControl);
    action(this.endTimeControl);
    if (!exclude24HControl) {
      action(this.open24h);
    }
  }
}
