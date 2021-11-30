import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationAuthService } from 'src/app/services/operation/api/operation-auth.service';
import { first, map } from 'rxjs/operators';
import { TenantCastAuthService } from 'src/app/services/cast/api/tenant-cast-auth.service';

@Injectable({
  providedIn: 'root',
})
export class TenantCastGuestGuard implements CanActivate {
  constructor(
    private tenantCastAuthService: TenantCastAuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tenantCastAuthService.loggIn$()
      .pipe(
        first(),
        map(v => {
          if (!v) {
            return true;
          }

          return this.router.createUrlTree([ '/tenant-cast' ]);
        }),
      );
  }

}
