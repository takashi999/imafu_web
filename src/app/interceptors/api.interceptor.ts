import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { tap } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

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
    {
      endpoint: 'https://ito-imafuu-ap.test/api/v1/tenant',
      replacement: '@te',
      tokenKey: 'tenantToken',
    },
  ];

  overlayRef = this.overlay.create({
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    hasBackdrop: true,
  });
  portal = new ComponentPortal(LoadingSpinnerComponent);
  incrementCount = 0;

  constructor(
    private tokenService: TokenService,
    private overlay: Overlay,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const endpoint = this.endpoints.find(e => {
      return new RegExp('^' + e.replacement).test(request.url);
    });

    if (endpoint) {

      if (!this.overlayRef.hasAttached()) {
        this.overlayRef.attach(this.portal);
      }
      this.incrementCount++;

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
            this.incrementCount--;
            if (this.incrementCount === 0) {
              this.overlayRef.detach();
            }

            if (err instanceof HttpErrorResponse && err.status === 401) {
              this.tokenService.resetToken(endpoint.tokenKey);
              location.reload();
            }
          },
          complete: () => {
            this.incrementCount--;
            if (this.incrementCount === 0) {
              this.overlayRef.detach();
            }
          },
        }),
      );
    }

    return next.handle(request);
  }
}

@Component({
  template: `
    <mat-spinner
      color="primary"
      mode="indeterminate"
    ></mat-spinner>`,
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
