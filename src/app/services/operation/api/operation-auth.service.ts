import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TokenService } from 'src/app/services/token.service';
import { Observable, Subject } from 'rxjs';
import { SILENT_SNACK } from 'src/app/interceptors/api.interceptor';

@Injectable({
  providedIn: 'root',
})
export class OperationAuthService {

  private loginNotifier$ = new Subject();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  loggIn$() {
    return new Observable<boolean>(subscriber => {
      subscriber.next(this.tokenService.tokens.operationToken !== '');

      subscriber.add(
        this.loginNotifier$
          .subscribe(() => {
            subscriber.next(this.tokenService.tokens.operationToken !== '');
          }),
      );
    });
  }

  guest$() {
    return this.loggIn$().pipe(map(v => !v));
  }

  login(body: { login_id: string; password: string; }) {
    return this.httpClient.post('@op/login', body, {
      responseType: 'text',
      context: new HttpContext().set(SILENT_SNACK, true),
    })
      .pipe(
        tap(x => {
          this.tokenService.setOperationToken(x);
          this.loginNotifier$.next();
        }),
      );
  }

  me() {
    return this.httpClient.get('@op/me');
  }

  logout() {
    return this.httpClient.patch('@op/logout', {}, {
      responseType: 'text',
    });
  }
}
