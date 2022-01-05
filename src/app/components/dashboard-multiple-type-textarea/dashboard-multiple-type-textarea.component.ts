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
import {
  DashboardEditableTextTypeSelectComponent,
} from 'src/app/components/dashboard-editable-text-type-select/dashboard-editable-text-type-select.component';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-multiple-type-textarea',
  templateUrl: './dashboard-multiple-type-textarea.component.html',
  styleUrls: [ './dashboard-multiple-type-textarea.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMultipleTypeTextareaComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() name = '';

  s = new Subscription();
  selectedTextType: 'plain' | 'html' | string = 'plain';

  fc = new FormControl('');

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input() set ref(val: DashboardEditableTextTypeSelectComponent) {
    this.s.add(val.changeEditableTextType.subscribe(res => {
      this.selectedTextType = res;
      this.changeDetectorRef.markForCheck();
    }));
  }

  onChange = (v: any) => {
  };

  onTouched = () => {
  };

  ngOnInit(): void {
    this.s.add(this.fc.valueChanges.subscribe(val => {
      this.onChange(val);
    }));
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

  setDisabledState(isDisabled: boolean): void {
    this.fc[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

  writeValue(obj: any): void {
    this.fc.setValue(obj, { emitEvent: false });
  }

}
