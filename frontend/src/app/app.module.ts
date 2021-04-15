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
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OnePageComponent } from './views/users/one-page/one-page.component';
import { HomeComponent } from './views/admin/home/home.component';
import { AdminComponent } from './views/admin/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AnimalesComponent } from './views/admin/animales/animales.component';
import { CargosComponent } from './views/admin/cargos/cargos.component';
import { EmpleadosComponent } from './views/admin/empleados/empleados.component';
import { FincasComponent } from './views/admin/fincas/fincas.component';
import { ModalsComponent } from './components/modals/modals.component';
import { CreateAnimalsComponent } from './views/admin/animales/create-animals/create-animals.component';
import { CrearCargoComponent } from './views/admin/cargos/crear-cargo/crear-cargo.component';
import { VerCargoComponent } from './views/admin/cargos/ver-cargo/ver-cargo.component';
import { EditarCargoComponent } from './views/admin/cargos/editar-cargo/editar-cargo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsersComponent,
    RegisterUsersComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    LoaderComponent,
    NavbarComponent,
    OnePageComponent,
    HomeComponent,
    AdminComponent,
    SidebarComponent,
    AnimalesComponent,
    CargosComponent,
    EmpleadosComponent,
    FincasComponent,
    ModalsComponent,
    CreateAnimalsComponent,
    CrearCargoComponent,
    VerCargoComponent,
    EditarCargoComponent
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
