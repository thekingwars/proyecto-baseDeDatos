import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsersComponent } from './views/users/login-users/login-users.component';
import { RegisterUsersComponent } from './views/users/register-users/register-users.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { VerifyEmailComponent } from './views/users/verify-email/verify-email.component';
import { ResetPasswordComponent } from './views/users/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsersComponent,
    RegisterUsersComponent,
    VerifyEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '486407368646-vfo89t8taavvb6tc56er2hh4v7j5rt87.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
