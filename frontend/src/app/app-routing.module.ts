import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './views/admin/admin/admin.component';
import { AnimalesComponent } from './views/admin/animales/animales.component';
import { CreateAnimalsComponent } from './views/admin/animales/create-animals/create-animals.component';
import { CargosComponent } from './views/admin/cargos/cargos.component';
import { CrearCargoComponent } from './views/admin/cargos/crear-cargo/crear-cargo.component';
import { EmpleadosComponent } from './views/admin/empleados/empleados.component';
import { FincasComponent } from './views/admin/fincas/fincas.component';
import { HomeComponent } from './views/admin/home/home.component';
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
  {path: 'admin', component: AdminComponent, children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'animales',
        component: AnimalesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'animales/crearAnimal',
        component: CreateAnimalsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cargos',
        component: CargosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cargos/crearCargo',
        component: CrearCargoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cargos/editarCargo',
        component: CrearCargoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cargos/verCargo',
        component: CrearCargoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fincas',
        component: FincasComponent,
        canActivate: [AuthGuard]
      },
  ]},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
