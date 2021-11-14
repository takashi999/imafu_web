import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor, LoadingSpinnerComponent } from 'src/app/interceptors/api.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    OverlayModule,
    CommonComponentsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: APIInterceptor,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
