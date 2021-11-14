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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-select',
  templateUrl: './dashboard-select.component.html',
  styleUrls: [ './dashboard-select.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() name = '';
  @Input() selects: {
    value: any;
    label: string;
  }[] | null = null;

  s = new Subscription();
  fc = new FormControl('');

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get hintLabel(): string {
    return '';
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
