import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { asyncScheduler, AsyncSubject, of, scheduled, Subscription } from 'rxjs';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { EditableTextTypes } from 'src/app/services/tenant/api/responses';
import { concatAll } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-editable-text-type-select',
  templateUrl: './dashboard-editable-text-type-select.component.html',
  styleUrls: [ './dashboard-editable-text-type-select.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEditableTextTypeSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private static editableTextTypes?: EditableTextTypes;
  private static isFirstGetEditableTextTypesMaster = true;
  private static firstGetEditableTextTypesMasterWait$ = of();

  @Input() name = '';

  @Output() changeEditableTextType = new EventEmitter<'plain' | 'html'>();

  s = new Subscription();
  fc = new FormControl('');

  editableTextTypes$ = new AsyncSubject<EditableTextTypes>();
  textTypeSelects: { value: string; label: string; }[] = [];

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private tenantMasterService: TenantMasterService,
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
      this.editableTextTypes$.subscribe(res => {
        this.textTypeSelects = res.map(r => ({
          value: r.id.toString(10),
          label: { plain: 'プレーンテキスト', html: 'HTML' }[r.type] + '形式',
        }));

        this.s.add(
          scheduled([ [ this.fc.value ], this.fc.valueChanges ], asyncScheduler)
            .pipe(concatAll())
            .subscribe((val) => {
              const select = res.find(r => r.id.toString(10) === val);
              if (select) {
                const type = (select.type as 'html' | 'plain');
                this.changeEditableTextType.emit(type);
              }
            }),
        );


        this.changeDetectorRef.markForCheck();
      }),
    );

    this.s.add(this.fc.valueChanges.subscribe(val => {
      this.onChange(val);
    }));

    this.cacheCheck();
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

  private cacheCheck() {
    const cache = DashboardEditableTextTypeSelectComponent.editableTextTypes;
    if (typeof cache !== 'undefined') {
      this.editableTextTypes$.next(cache);
      this.editableTextTypes$.complete();
    } else {
      if (DashboardEditableTextTypeSelectComponent.isFirstGetEditableTextTypesMaster) {
        const wait = new AsyncSubject<void>();
        DashboardEditableTextTypeSelectComponent.firstGetEditableTextTypesMasterWait$ = wait;
        DashboardEditableTextTypeSelectComponent.isFirstGetEditableTextTypesMaster = false;
        this.s.add(this.tenantMasterService.editableTextTypes().subscribe(res => {
          DashboardEditableTextTypeSelectComponent.editableTextTypes = res;
          this.editableTextTypes$.next(res);
          this.editableTextTypes$.complete();
          wait.next();
          wait.complete();
        }));
      } else {
        this.s.add(DashboardEditableTextTypeSelectComponent.firstGetEditableTextTypesMasterWait$.subscribe({
          complete: () => {
            this.cacheCheck();
          },
        }));
      }
    }
  }

}
