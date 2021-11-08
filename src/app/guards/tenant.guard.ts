import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationAuthService } from 'src/app/services/operation/api/operation-auth.service';
import { first, map } from 'rxjs/operators';
import { TenantAuthService } from 'src/app/services/tenant/api/tenant-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TenantGuard implements CanActivate {
  constructor(private tenantAuthService: TenantAuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tenantAuthService.loggIn$()
      .pipe(
        first(),
        map(v => {
          if (v) {
            return v;
          }

          return this.router.createUrlTree([ '/tenant/login' ], {
            queryParams: {
              redirectTo: state.url,
            },
          });
        }),
      );
  }
}
