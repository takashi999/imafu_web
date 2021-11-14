import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';
import { OperationUserRoleService } from 'src/app/services/operation/api/operation-user-role.service';
import { maxLength16Validator, passwordValidators } from 'src/app/validators/common-validators';

@Component({
  selector: 'app-operation-user-create',
  templateUrl: './operation-user-create.component.html',
  styleUrls: [ './operation-user-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationUserCreateComponent implements OnInit, OnDestroy {
  s = new Subscription();
  roles$ = this.operationUserRoleService.list();
  hidePassword = true;

  fg = new FormGroup({
    login_id: new FormControl('', [ Validators.required, maxLength16Validator ]),
    password: new FormControl('', [ Validators.required, ...passwordValidators ]),
    role_id: new FormControl('', [ Validators.required ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationStaffService: OperationStaffService,
    private operationUserRoleService: OperationUserRoleService,
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.operationStaffService.create({
        ...this.fg.value,
      })
        .subscribe((res) => {
          this.router.navigateByUrl('/operation/users');
        }),
    );
  }

}
