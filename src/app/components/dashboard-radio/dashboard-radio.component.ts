import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-radio',
  templateUrl: './dashboard-radio.component.html',
  styleUrls: [ './dashboard-radio.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DashboardRadioComponent),
    multi: true,
  } ],
})
export class DashboardRadioComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() selects: { value: any; label: string; }[] = [];

  fc = new FormControl();
  s = new Subscription();

  constructor() {
  }

  onChange = (v: any) => {
  };
  onTouched = () => {
  };

  ngOnInit(): void {
    this.s.add(
      this.fc.valueChanges.subscribe(res => {
        this.onChange(res);
      }),
    );
  }

  ngOnDestroy(): void {
    this.s.unsubscribe();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.fc[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

  writeValue(obj: any): void {
    this.fc.setValue(obj, { emitEvent: false });
  }

}
