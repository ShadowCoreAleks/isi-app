import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HeaderComponent } from './components/header/header.component';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchErrorInterceptor } from './interceptors/catch-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    UserListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GenericButtonComponent,
  ],
  providers: [
    provideHttpClient(withInterceptors([catchErrorInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
