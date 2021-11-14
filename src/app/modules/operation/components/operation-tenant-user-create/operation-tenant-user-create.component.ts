import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { OperationTenantUserService } from 'src/app/services/operation/api/operation-tenant-user.service';
import { maxLength16Validator, passwordValidators } from 'src/app/validators/common-validators';

@Component({
  selector: 'app-operation-tenant-user-create',
  templateUrl: './operation-tenant-user-create.component.html',
  styleUrls: [ './operation-tenant-user-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantUserCreateComponent implements OnInit, OnDestroy {
  s = new Subscription();
  hidePassword = true;

  tenantId$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => {
      return parseInt(paramMap.get('tenant_id') ?? '', 10);
    }),
  );

  fg = new FormGroup({
    login_id: new FormControl('', [ Validators.required, maxLength16Validator ]),
    password: new FormControl('', [ Validators.required, ...passwordValidators ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationTenantUserService: OperationTenantUserService,
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub(tenantId: number) {
    this.s.add(
      this.operationTenantUserService.create(tenantId, {
        ...this.fg.value,
      })
        .subscribe((res) => {
          this.router.navigateByUrl('/operation/tenants/' + tenantId);
        }),
    );
  }

}
