import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationAuthService } from 'src/app/services/operation/api/operation-auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OperationGuestGuard implements CanActivate {
  constructor(
    private operationAuthService: OperationAuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.operationAuthService.loggIn$()
      .pipe(
        map(v => {
          if (!v) {
            return true;
          }

          return this.router.createUrlTree([ '/operation' ]);
        }),
      );
  }

}
