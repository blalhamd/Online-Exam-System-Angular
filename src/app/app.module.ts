import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addJwtTokenInterceptor } from './shared/interceptors/add-jwt-token.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { checkExpireInterceptor } from './shared/interceptors/check-expire.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    provideHttpClient(
      withInterceptors([
        addJwtTokenInterceptor,
        errorInterceptor,
        checkExpireInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
