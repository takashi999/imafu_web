import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantAuthService } from 'src/app/services/tenant/api/tenant-auth.service';

@Component({
  selector: 'app-tenant-login',
  templateUrl: './tenant-login.component.html',
  styleUrls: [ './tenant-login.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantLoginComponent implements OnInit {
  hide = true;
  fg = new FormGroup({
    login_id: new FormControl(''),
    password: new FormControl(''),
  });
  s = new Subscription();
  failed = false;

  constructor(
    private tenantAuthService: TenantAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  onSub() {
    this.s.add(
      this.tenantAuthService.login(this.fg.value)
        .subscribe({
          next: () => {
            const redirect = this.activatedRoute.snapshot.queryParamMap.get('redirectTo');
            if (redirect) {
              this.router.navigateByUrl(redirect);
            } else {
              this.router.navigate([ '../' ], {
                relativeTo: this.activatedRoute,
              });
            }
          },
          error: () => {
            this.failed = true;
            this.changeDetectorRef.markForCheck();
          },
        }),
    );
  }

}
