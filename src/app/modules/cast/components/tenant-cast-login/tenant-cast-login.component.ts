import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TenantAuthService } from 'src/app/services/tenant/api/tenant-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantCastAuthService } from 'src/app/services/cast/api/tenant-cast-auth.service';

@Component({
  selector: 'app-tenant-cast-login',
  templateUrl: './tenant-cast-login.component.html',
  styleUrls: ['./tenant-cast-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantCastLoginComponent implements OnInit {
  fg = new FormGroup({
    login_id: new FormControl(''),
    password: new FormControl(''),
  });
  s = new Subscription();
  failed = false;

  constructor(
    private tenantCastAuthService: TenantCastAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  onSub() {
    this.s.add(
      this.tenantCastAuthService.login(this.fg.value)
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
          },
        }),
    );
  }
}
