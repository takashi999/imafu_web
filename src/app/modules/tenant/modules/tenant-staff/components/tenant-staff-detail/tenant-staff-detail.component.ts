import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantStaffService } from 'src/app/services/tenant/api/tenant-staff.service';
import { maxLength16Validator, passwordValidators } from 'src/app/validators/common-validators';

@Component({
  selector: 'app-tenant-staff-detail',
  templateUrl: './tenant-staff-detail.component.html',
  styleUrls: [ './tenant-staff-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantStaffDetailComponent implements OnInit, OnDestroy {

  s = new Subscription();
  hidePassword = true;

  detail$ = this.activatedRoute.paramMap.pipe(
    mergeMap(paramMap =>
      this.tenantStaffService.get(parseInt(paramMap.get('staffId') ?? '', 10)),
    ),
  );

  fg = new FormGroup({
    login_id: new FormControl('', [ Validators.required, maxLength16Validator ]),
    password: new FormControl('', [ ...passwordValidators ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantStaffService: TenantStaffService,
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

  onSub(staffId: number) {
    const pass = this.fg.get('password')?.value;

    if (typeof staffId !== 'undefined') {
      this.s.add(
        this.tenantStaffService.modify(staffId, {
          ...this.fg.value,
          password: pass === '' ? null : pass,
        })
          .subscribe((res) => {
            this.router.navigate([ '../' ], { relativeTo: this.activatedRoute });
          }),
      );
    }
  }
}
