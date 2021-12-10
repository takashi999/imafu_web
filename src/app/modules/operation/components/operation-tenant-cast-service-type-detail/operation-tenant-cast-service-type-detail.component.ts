import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationTenantCastServiceService } from 'src/app/services/operation/api/operation-tenant-cast-service.service';
import { filter, map, mergeMap, multicast } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength30Validator } from 'src/app/validators/common-validators';
import { OperationTenantCastServiceType } from 'src/app/services/operation/api/responses';

@Component({
  selector: 'app-operation-tenant-cast-service-type-detail',
  templateUrl: './operation-tenant-cast-service-type-detail.component.html',
  styleUrls: [ './operation-tenant-cast-service-type-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantCastServiceTypeDetailComponent implements OnInit, OnDestroy {

  s = new Subscription();
  id$ = this.activatedRoute.paramMap.pipe(map(value => value.get('tenant_cast_service_type_id')));
  detail$ = multicast(new BehaviorSubject<OperationTenantCastServiceType | null>(null))(
    this.id$.pipe(
      mergeMap(id => {
        return id === null ? of(null) : this.operationTenantCastServiceService.get(parseInt(id, 10));
      }),
    ),
  );
  title$ = this.detail$.pipe(map(res => res === null ? '可能サービス作成' : `可能サービス編集: ${ res.display_name }`));
  buttonText$ = this.detail$.pipe(map(res => res === null ? '作成' : `更新`));

  fg = new FormGroup({
    service_type_id: new FormControl('', [ maxLength30Validator, Validators.required, Validators.pattern(/^[a-zA-Z0-9\-]*$/) ]),
    display_name: new FormControl('', [ maxLength30Validator, Validators.required ]),
  });

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private operationTenantCastServiceService: OperationTenantCastServiceService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(this.detail$.connect());

    this.s.add(
      this.detail$
        .pipe(
          filter((v): v is Exclude<typeof v, null> => v !== null),
        )
        .subscribe(res => {
          this.fg.patchValue(res, { emitEvent: false });
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.detail$
        .pipe(
          mergeMap(res => {
            if (res === null) {
              return this.onRegister();
            } else {
              return this.onUpdate(res);
            }
          }),
        )
        .subscribe(res => {
          this.router.navigate([ '../' ], {
            relativeTo: this.activatedRoute,
          });
        }),
    );
  }

  onRegister() {
    return this.operationTenantCastServiceService.create(this.fg.value);
  }

  onUpdate(data: OperationTenantCastServiceType) {
    return this.operationTenantCastServiceService.modify(data.id, this.fg.value);
  }
}
