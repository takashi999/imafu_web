import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantStaffService } from 'src/app/services/tenant/api/tenant-staff.service';
import { maxLength16Validator, passwordValidators } from 'src/app/validators/common-validators';

@Component({
  selector: 'app-tenant-staff-create',
  templateUrl: './tenant-staff-create.component.html',
  styleUrls: [ './tenant-staff-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantStaffCreateComponent implements OnInit, OnDestroy {
  s = new Subscription();

  hidePassword = true;

  fg = new FormGroup({
    login_id: new FormControl('', [ Validators.required, maxLength16Validator ]),
    password: new FormControl('', [ Validators.required, ...passwordValidators ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantStaffService: TenantStaffService,
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.tenantStaffService.create({
        ...this.fg.value,
      })
        .subscribe((res) => {
          this.router.navigate([ '../' ], { relativeTo: this.activatedRoute });
        }),
    );
  }

}
