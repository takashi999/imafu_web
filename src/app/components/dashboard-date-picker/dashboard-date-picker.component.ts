import { ChangeDetectionStrategy, Component, forwardRef, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
class CustomizedDateAdaptor extends NativeDateAdapter {
  getDateNames(): string[] {
    const dateNames: string[] = [];
    for (let i = 0; i < 31; i++) {
      dateNames[i] = String(i + 1);
    }
    return dateNames;
  }
}

@Component({
  selector: 'app-dashboard-date-picker',
  templateUrl: './dashboard-date-picker.component.html',
  styleUrls: [ './dashboard-date-picker.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DashboardDatePickerComponent),
    },
    {
      provide: DateAdapter,
      useClass: CustomizedDateAdaptor,
    },
  ],
})
export class DashboardDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() name = '';

  fc = new FormControl('');
  s = new Subscription();

  constructor(
    private dateAdapter: DateAdapter<NativeDateAdapter>,
  ) {
  }

  onChange = (v: any) => {
  };

  onTouched = () => {
  };

  ngOnInit(): void {
    this.s.add(
      this.fc.valueChanges.subscribe(value => {
        this.onChange(format(value, 'yyyy-MM-dd'));
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

  writeValue(obj: any): void {
    this.fc.setValue(obj, { emitEvent: false });
  }

  setDisabledState(isDisabled: boolean) {
    this.fc[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

}
