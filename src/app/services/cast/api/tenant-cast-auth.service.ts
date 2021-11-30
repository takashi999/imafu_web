import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenantCastAuthService {

  private loginNotifier$ = new Subject();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  loggIn$() {
    return new Observable<boolean>(subscriber => {
      subscriber.next(this.tokenService.tokens.tenantCastToken !== '');

      subscriber.add(
        this.loginNotifier$
          .subscribe(() => {
            subscriber.next(this.tokenService.tokens.tenantCastToken !== '');
          }),
      );
    });
  }

  guest$() {
    return this.loggIn$().pipe(map(v => !v));
  }

  login(body: { login_id: string; password: string; }) {
    return this.httpClient.post('@ca/login', body, {
      responseType: 'text',
    })
      .pipe(
        tap(x => {
          this.tokenService.setTenantCastToken(x);
          this.loginNotifier$.next();
        }),
      );
  }

  me() {
    return this.httpClient.get('@ca/me');
  }
}
