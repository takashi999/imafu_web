import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';
import { OperationUser } from 'src/app/services/operation/api/responses';
import { OperationUserRoleService } from 'src/app/services/operation/api/operation-user-role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operation-user-detail',
  templateUrl: './operation-user-detail.component.html',
  styleUrls: [ './operation-user-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationUserDetailComponent implements OnInit, OnDestroy {

  user_id?: number;
  s = new Subscription();
  detail?: OperationUser;
  roles$ = this.operationUserRoleService.list();
  hidePassword = true;

  fg = new FormGroup({
    login_id: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(16) ]),
    password: new FormControl('', [ Validators.minLength(8), Validators.maxLength(100) ]),
    role_id: new FormControl('', [ Validators.required ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationStaffService: OperationStaffService,
    private operationUserRoleService: OperationUserRoleService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.s.add(
      this.activatedRoute.paramMap
        .subscribe(param => {
          this.getUserIdByParamMap(param);
        }),
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    const pass = this.fg.get('password')?.value;

    const userId = this.user_id;
    if (typeof userId !== 'undefined') {
      this.s.add(
        this.operationStaffService.modify(userId, {
          ...this.fg.value,
          password: pass === '' ? undefined : pass,
        })
          .subscribe((res) => {
            this.router.navigateByUrl('/operation/users');
          }),
      );
    }
  }

  private setUserIdAndGetDetail(idStr: string) {
    this.user_id = parseInt(idStr ?? '0', 10);
    this.s.add(
      this.operationStaffService.getDetail(this.user_id)
        .subscribe(res => {
          this.detail = res;
          this.fg.patchValue(res);
          this.changeDetectorRef.markForCheck();
        }),
    );
  }

  private getUserIdByParamMap(paramMap: ParamMap) {
    const rawParam = paramMap.get('user_id');
    if (rawParam === null) {
      this.router.navigateByUrl('/operation/users');
      return;
    }
    this.setUserIdAndGetDetail(rawParam);
  }
}
