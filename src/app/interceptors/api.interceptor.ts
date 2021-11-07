import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class APIInterceptor implements HttpInterceptor {


  endpoints: {
    endpoint: string;
    tokenKey: keyof TokenService['tokens'];
    replacement: string,
  }[] = [
    {
      endpoint: 'https://ito-imafuu-ap.test/api/v1/operation',
      replacement: '@op',
      tokenKey: 'operationToken',
    },
  ];

  constructor(
    private tokenService: TokenService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const endpoint = this.endpoints.find(e => {
      return new RegExp('^' + e.replacement).test(request.url);
    });

    if (endpoint) {
      return next.handle(
        request.clone({
          url: request.url.replace(new RegExp('^' + endpoint.replacement), endpoint.endpoint),
          setHeaders: {
            Authorization: `Bearer ${ this.tokenService.tokens[endpoint.tokenKey] }`,
          },
        }),
      ).pipe(
        tap({
          error: err => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              this.tokenService.resetToken(endpoint.tokenKey);
            }
          },
        }),
      );
    }

    return next.handle(request);
  }
}
