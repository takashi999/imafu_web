import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIErrorComponent, APIInterceptor, LoadingSpinnerComponent } from 'src/app/interceptors/api.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    APIErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    OverlayModule,
    CommonComponentsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: APIInterceptor,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ja',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ja',
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
