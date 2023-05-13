import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/session/login/login.component';
import { RegisterComponent } from './components/session/register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { MedicamentosComponent } from './components/paginaInicio/medicamentos/medicamentos.component';
import { CitasComponent } from './components/paginaInicio/citas/citas.component';
import { AddCitaComponent } from './components/paginaInicio/add-cita/add-cita.component';
const routes: Routes = [
//RUTAS
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
//Session
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  //Dashboard
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  //Medicamentos
  {path:'medicamentos', component: MedicamentosComponent, canActivate: [AuthGuard]},
  //Citas
  {path:'citas', component: CitasComponent, canActivate:[AuthGuard]},
  //Añadir cita
  {path:'add-cita', component: AddCitaComponent, canActivate:[AuthGuard]},



  //Error
  {path:'**', redirectTo:'/login', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
