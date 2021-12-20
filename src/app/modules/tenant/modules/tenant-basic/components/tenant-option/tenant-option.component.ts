import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantOptionServiceService } from 'src/app/services/tenant/api/tenant-option.service';
import {
  maxLength40Validator,
  maxLength500Validator,
  maxLength64Validator,
} from 'src/app/validators/common-validators';

@Component({
  selector: 'app-tenant-option',
  templateUrl: './tenant-option.component.html',
  styleUrls: [ './tenant-option.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantOptionComponent implements OnInit, OnDestroy {

  formArrayMax = 50;
  detail$ = new Subject<any>();
  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    note: new FormControl('', [ maxLength500Validator ]),
    prices: new FormArray(
      new Array(10).fill(0).map(() => new FormGroup({
        title: new FormControl('', [ maxLength64Validator ]),
        price: new FormControl('', [ maxLength64Validator ]),
      })),
    ),
  });

  constructor(
    private tenantOptionServiceService: TenantOptionServiceService,
  ) {
  }

  get priceControlArray() {
    return this.fg.get('prices') as FormArray;
  }

  ngOnInit(): void {
    this.s.add(
      this.tenantOptionServiceService.get()
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$
        .subscribe(res => {
          this.fg.reset();
          this.priceControlArray.clear();
          res?.prices.forEach(() => {
            this.priceControlArray.push(new FormGroup({
              title: new FormControl('', [ maxLength64Validator ]),
              price: new FormControl('', [ maxLength64Validator ]),
            }), { emitEvent: false });
          });
          this.fg.patchValue(res, { emitEvent: false });
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onPush() {
    this.priceControlArray.push(
      new FormGroup({
        title: new FormControl('', [ maxLength64Validator ]),
        price: new FormControl('', [ maxLength64Validator ]),
      }),
    );
  }

  onSub() {
    this.s.add(
      this.tenantOptionServiceService.modify(this.fg.value)
        .subscribe(res => this.detail$.next(res)),
    );
  }

}
