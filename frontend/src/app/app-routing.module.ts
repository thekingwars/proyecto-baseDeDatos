import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './views/admin/admin/admin.component';
import { AnimalesComponent } from './views/admin/animales/animales.component';
import { CreateAnimalsComponent } from './views/admin/animales/create-animals/create-animals.component';
import { EditarAnimalComponent } from './views/admin/animales/editar-animal/editar-animal.component';
import { VerAnimalComponent } from './views/admin/animales/ver-animal/ver-animal.component';
import { CargosComponent } from './views/admin/cargos/cargos.component';
import { CrearCargoComponent } from './views/admin/cargos/crear-cargo/crear-cargo.component';
import { EditarCargoComponent } from './views/admin/cargos/editar-cargo/editar-cargo.component';
import { VerCargoComponent } from './views/admin/cargos/ver-cargo/ver-cargo.component';
import { CrearEmpleadoComponent } from './views/admin/empleados/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './views/admin/empleados/editar-empleado/editar-empleado.component';
import { EmpleadosComponent } from './views/admin/empleados/empleados.component';
import { VerEmpleadoComponent } from './views/admin/empleados/ver-empleado/ver-empleado.component';
import { CrearFincaComponent } from './views/admin/fincas/crear-finca/crear-finca.component';
import { EditarFincaComponent } from './views/admin/fincas/editar-finca/editar-finca.component';
import { FincasComponent } from './views/admin/fincas/fincas.component';
import { VerFincaComponent } from './views/admin/fincas/ver-finca/ver-finca.component';
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
        path: 'animales/verAnimal/:id',
        component: VerAnimalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'animales/editarAnimal/:id',
        component: EditarAnimalComponent,
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
        path: 'cargos/editarCargo/:id',
        component: EditarCargoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cargos/verCargo/:id',
        component: VerCargoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'empleados/crearEmpleado',
        component: CrearEmpleadoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'empleados/verEmpleado/:id',
        component: VerEmpleadoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'empleados/editarEmpleado/:id',
        component: EditarEmpleadoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fincas',
        component: FincasComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fincas/crearFinca',
        component: CrearFincaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fincas/verFinca/:id',
        component: VerFincaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fincas/editarFinca/:id',
        component: EditarFincaComponent,
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
