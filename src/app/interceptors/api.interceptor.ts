import { ChangeDetectionStrategy, Component, Injectable, Input } from '@angular/core';
import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { mergeMap, retryWhen, tap } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

export const SILENT_SNACK = new HttpContextToken(() => false);

@Injectable()
export class APIInterceptor implements HttpInterceptor {


  endpoints: {
    endpoint: string;
    tokenKey: keyof TokenService['tokens'];
    replacement: string,
  }[] = [
    {
      endpoint: environment.serverUrl + '/api/v1/operation',
      replacement: '@op',
      tokenKey: 'operationToken',
    },
    {
      endpoint: environment.serverUrl + '/api/v1/tenant',
      replacement: '@te',
      tokenKey: 'tenantToken',
    },
    {
      endpoint: environment.serverUrl + '/api/v1/tenant-cast',
      replacement: '@ca',
      tokenKey: 'tenantCastToken',
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
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
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

      return new Observable(subscriber => {
        next.handle(
          request.clone({
            url: request.url.replace(new RegExp('^' + endpoint.replacement), endpoint.endpoint),
            setHeaders: {
              Authorization: `Bearer ${ this.tokenService.tokens[endpoint.tokenKey] }`,
            },
          }),
        ).pipe(
          retryWhen(errors => {
            return errors.pipe(
              mergeMap(error => {
                if (error instanceof HttpErrorResponse) {
                  if (error.status === 429) {
                    const retrySeconds = parseInt(error.headers.get('Retry-After') ?? ``, 10);
                    const ref = this.matSnackBar.open(`短期間でのアクセスが多すぎました、${ retrySeconds }秒後にリトライします`, '閉じる', {
                      duration: retrySeconds * 1000,
                    });
                    return timer(retrySeconds * 1000);
                  }
                }

                return throwError(error);
              }),
            );
          }),
          tap({
            error: err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.tokenService.resetToken(endpoint.tokenKey);
                  location.reload();
                }
                if (err.status === 422 && err.error?.message) {
                  const message = this.getValidationErrors(err);
                  const ref = this.matDialog.open(APIErrorComponent);
                  ref.componentInstance.message = `リクエストエラー\n\n${ message }`;
                }
              }
            },
            complete: () => {
              if (!request.context.get(SILENT_SNACK)) {
                if (request.method === 'POST') {
                  this.matSnackBar.open('作成が完了しました', '閉じる', {
                    duration: 3000,
                  });
                }
                if (request.method === 'PATCH') {
                  this.matSnackBar.open('更新が完了しました', '閉じる', {
                    duration: 3000,
                  });
                }
                if (request.method === 'DELETE') {
                  this.matSnackBar.open('削除が完了しました', '閉じる', {
                    duration: 3000,
                  });
                }
              }
            },
          }),
        )
          .subscribe(subscriber);

        return () => {
          this.incrementCount--;
          if (this.incrementCount === 0) {
            this.overlayRef.detach();
          }
        };
      });
    }

    return next.handle(request);
  }

  private getValidationErrors(error: any) {
    if (error instanceof HttpErrorResponse) {
      return Object.keys(error.error.errors)
        .map(c => {
          const arr = error.error.errors[c] ?? [];
          const messages = arr.map((m: string) => `  ${ m }`).join('\n');
          return `${ c }: \n${ messages }`;
        })
        .join('\n');
    }

    return '';
  }
}

@Component({
  template: `
    <mat-spinner
      color="primary"
      mode="indeterminate"
    ></mat-spinner>`,
})
export class LoadingSpinnerComponent {
}

@Component({
  template: `
    <p>{{ message }}</p>
    <mat-dialog-actions align="end">
      <button mat-dialog-close="" mat-flat-button color="primary">閉じる</button>
    </mat-dialog-actions>
  `,
  styles: [
    `p {
      white-space: pre-wrap;
      padding: 20px 0;
    }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APIErrorComponent {
  @Input() message = '';
}
