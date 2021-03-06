import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginUsersComponent } from './views/users/login-users/login-users.component';
import { OnePageComponent } from './views/users/one-page/one-page.component';
import { RegisterUsersComponent } from './views/users/register-users/register-users.component';
import { ResetPasswordComponent } from './views/users/reset-password/reset-password.component';
import { VerifyEmailComponent } from './views/users/verify-email/verify-email.component';

const routes: Routes = [
  {path: '', component: OnePageComponent},
  {path: 'register', component: RegisterUsersComponent},
  {path: 'login', component: LoginUsersComponent},
  {path: 'verifyEmail', component: VerifyEmailComponent},
  {path: 'resetPassword/:token', component: ResetPasswordComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
