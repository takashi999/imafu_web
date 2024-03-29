import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ValidatorFn, Validators } from '@angular/forms';
import {
  maxLength100000Validator,
  maxLength1000Validator,
  maxLength100Validator,
  maxLength10Validator,
  maxLength15Validator,
  maxLength16Validator,
  maxLength180Validator,
  maxLength20000Validator,
  maxLength200Validator,
  maxLength20Validator,
  maxLength300Validator,
  maxLength30Validator,
  maxLength35Validator,
  maxLength40Validator,
  maxLength500Validator,
  maxLength60Validator,
  maxLength64Validator,
  minLength8Validator,
} from 'src/app/validators/common-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-textarea',
  templateUrl: './dashboard-textarea.component.html',
  styleUrls: [ './dashboard-textarea.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTextareaComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() hasValidatorFn?: (validator: ValidatorFn) => boolean;
  @Input() name = '';
  @Input() rows = 3;
  @Input() autoResize = true;

  s = new Subscription();

  fc = new FormControl('');

  min: number | null = null;
  max: number | null = null;

  required = false;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get hintLabel(): string {
    if (this.min !== null && this.max !== null) {
      return `${ this.min } - ${ this.max }文字`;
    } else if (this.min !== null) {
      return `${ this.min }文字以上`;
    } else if (this.max !== null) {
      return `最大${ this.max }文字`;
    }

    return '';
  }

  onChange = (v: any) => {
  };

  onTouched = () => {
  };

  ngOnInit(): void {
    // Min
    [
      { validator: minLength8Validator, num: 8 },
    ].forEach(v => {
      if (this.hasValidatorFn?.(v.validator) ?? this.ngControl?.control?.hasValidator(v.validator)) {
        this.min = v.num;
      }
    });

    // Max
    [
      { validator: maxLength10Validator, num: 10 },
      { validator: maxLength15Validator, num: 15 },
      { validator: maxLength16Validator, num: 16 },
      { validator: maxLength20Validator, num: 20 },
      { validator: maxLength30Validator, num: 30 },
      { validator: maxLength35Validator, num: 35 },
      { validator: maxLength40Validator, num: 40 },
      { validator: maxLength60Validator, num: 60 },
      { validator: maxLength64Validator, num: 64 },
      { validator: maxLength100Validator, num: 100 },
      { validator: maxLength180Validator, num: 180 },
      { validator: maxLength200Validator, num: 200 },
      { validator: maxLength300Validator, num: 300 },
      { validator: maxLength500Validator, num: 500 },
      { validator: maxLength1000Validator, num: 1000 },
      { validator: maxLength20000Validator, num: 20000 },
      { validator: maxLength100000Validator, num: 100000 },
    ].forEach(v => {
      if (this.hasValidatorFn?.(v.validator) ?? this.ngControl?.control?.hasValidator(v.validator)) {
        this.max = v.num;
      }
    });

    // Required
    this.required = this.hasValidatorFn?.(Validators.required) ?? this.ngControl.control?.hasValidator(Validators.required) ?? false;

    this.s.add(
      this.fc.valueChanges.subscribe(res => {
        this.onChange(res);
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

  writeValue(obj: any): void {
    this.fc.setValue(obj, { emitEvent: false });
  }

  setDisabledState(isDisabled: boolean) {
    this.fc[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

}
