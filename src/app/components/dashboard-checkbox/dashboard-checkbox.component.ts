import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard-checkbox',
    templateUrl: './dashboard-checkbox.component.html',
    styleUrls: [ './dashboard-checkbox.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DashboardCheckboxComponent),
        multi: true,
    } ],
})
export class DashboardCheckboxComponent implements OnInit, OnDestroy, ControlValueAccessor {

    fc = new FormControl([]);
    fa = new FormArray([]);
    fg = new FormGroup({
        array: this.fa,
    });
    s = new Subscription();
    private _selects: { value: any; label: string; }[] = [];

    constructor() {
    }

    get selects() {
        return this._selects;
    }

    @Input() set selects(val: { value: any; label: string; }[] | null) {
        if (val) {
            this.fa.clear({ emitEvent: false });
            val.forEach(v => {
                this.fa.push(
                    new FormControl(
                        (this.fc.value as number[]).some(v2 => v2 === v.value),
                    ),
                    {
                        emitEvent: false,
                    },
                );
            });

            this._selects = val;
        }
    };

    onChange = (v: any) => {
    };
    onTouched = () => {
    };

    ngOnInit(): void {
        this.s.add(
            this.fa.valueChanges.subscribe((res: boolean[]) => {
                const result = res
                    .map((v, i) => v ? this.selects?.[i].value ?? null : null)
                    .filter(v => v !== null);

                this.fc.setValue(result, { emitEvent: false });
                this.onChange(result);
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

    writeValue(obj: number[]): void {
        this.fc.setValue(obj, { emitEvent: false });
        this.fa.clear({ emitEvent: false });
        this.selects?.forEach(v => {
            this.fa.push(new FormControl(obj.some(v2 => v2 === parseInt(v.value, 10))));
        });
    }

}
