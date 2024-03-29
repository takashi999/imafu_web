import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TokenService } from 'src/app/services/token.service';
import { Observable, Subject } from 'rxjs';
import { TenantUser } from 'src/app/services/tenant/api/responses';
import { SILENT_SNACK } from 'src/app/interceptors/api.interceptor';

@Injectable({
  providedIn: 'root',
})
export class TenantAuthService {

  public loginNotifier$ = new Subject();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  loggIn$() {
    return new Observable<boolean>(subscriber => {
      subscriber.next(this.tokenService.tokens.tenantToken !== '');

      subscriber.add(
        this.loginNotifier$
          .subscribe(() => {
            subscriber.next(this.tokenService.tokens.tenantToken !== '');
          }),
      );
    });
  }

  guest$() {
    return this.loggIn$().pipe(map(v => !v));
  }

  login(body: { login_id: string; password: string; }) {
    return this.httpClient.post('@te/login', body, {
      responseType: 'text',
      context: new HttpContext().set(SILENT_SNACK, true),
    })
      .pipe(
        tap(x => {
          this.tokenService.setTenantToken(x);
          this.loginNotifier$.next();
        }),
      );
  }

  me() {
    return this.httpClient.get<TenantUser>('@te/me');
  }

  logout() {
    return this.httpClient.patch('@te/logout', {}, {
      responseType: 'text',
    });
  }
}
