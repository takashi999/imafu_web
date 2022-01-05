import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
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
      provide: DateAdapter,
      useClass: CustomizedDateAdaptor,
    },
  ],
})
export class DashboardDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() name = '';

  fc = new FormControl('');
  s = new Subscription();

  required = false;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
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
      this.fc.valueChanges.subscribe(value => {
        this.onChange(format(value, 'yyyy-MM-dd'));
      }),
    );

    this.required = this.ngControl.control?.hasValidator(Validators.required) ?? false;
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
