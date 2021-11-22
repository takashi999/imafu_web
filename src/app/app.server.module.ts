import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './components/app.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CommonComponentsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
