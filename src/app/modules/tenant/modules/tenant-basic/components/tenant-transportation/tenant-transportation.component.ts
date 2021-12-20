import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { TenantTransportationService } from 'src/app/services/tenant/api/tenant-transportation.service';
import {
  maxLength40Validator,
  maxLength500Validator,
  maxLength64Validator,
} from 'src/app/validators/common-validators';

@Component({
  selector: 'app-tenant-transportation',
  templateUrl: './tenant-transportation.component.html',
  styleUrls: [ './tenant-transportation.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantTransportationComponent implements OnInit, OnDestroy {

  formArrayMax = 10;
  detail$ = new Subject<any>();
  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    note: new FormControl('', [ maxLength500Validator ]),
    areas: new FormArray(
      new Array(10).fill(0).map(() => new FormGroup({
        area: new FormControl('', [ maxLength64Validator ]),
        price: new FormControl('', [ maxLength64Validator ]),
      })),
    ),
  });

  constructor(
    private tenantTransportationService: TenantTransportationService,
  ) {
  }

  get areaControlArray() {
    return this.fg.get('areas') as FormArray;
  }

  ngOnInit(): void {
    this.s.add(
      this.tenantTransportationService.get()
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$
        .subscribe(res => {
          this.fg.reset();
          this.areaControlArray.clear();
          res?.areas.forEach(() => {
            this.areaControlArray.push(new FormGroup({
              area: new FormControl('', [ maxLength64Validator ]),
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
    this.areaControlArray.push(
      new FormGroup({
        area: new FormControl('', [ maxLength64Validator ]),
        price: new FormControl('', [ maxLength64Validator ]),
      }),
    );
  }

  onSub() {
    this.s.add(
      this.tenantTransportationService.modify(this.fg.value)
        .subscribe(res => this.detail$.next(res)),
    );
  }

}
