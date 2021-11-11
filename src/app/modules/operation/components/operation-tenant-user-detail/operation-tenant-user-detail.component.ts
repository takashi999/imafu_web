import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationTenantUserService } from 'src/app/services/operation/api/operation-tenant-user.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-operation-tenant-user-detail',
  templateUrl: './operation-tenant-user-detail.component.html',
  styleUrls: [ './operation-tenant-user-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantUserDetailComponent implements OnInit, OnDestroy {

  s = new Subscription();
  hidePassword = true;

  detail$ = this.activatedRoute.paramMap.pipe(
    mergeMap(paramMap =>
      this.operationTenantUserService.get(
        parseInt(paramMap.get('tenant_id') ?? '', 10),
        parseInt(paramMap.get('tenant_user_id') ?? '', 10),
      ),
    ),
  );

  fg = new FormGroup({
    login_id: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(16) ]),
    password: new FormControl('', [ Validators.minLength(8), Validators.maxLength(100) ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationTenantUserService: OperationTenantUserService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.detail$.subscribe(res => {
        this.fg.patchValue({
          ...res,
        }, { emitEvent: false });
      }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub(tenantId: number, userId: number) {
    const pass = this.fg.get('password')?.value;

    if (typeof userId !== 'undefined') {
      this.s.add(
        this.operationTenantUserService.modify(tenantId, userId, {
          ...this.fg.value,
          password: pass === '' ? null : pass,
        })
          .subscribe((res) => {
            this.router.navigateByUrl('/operation/tenants/' + tenantId);
          }),
      );
    }
  }
}
