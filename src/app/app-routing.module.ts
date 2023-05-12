import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/session/login/login.component';
import { RegisterComponent } from './components/session/register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { MedicamentosComponent } from './components/paginaInicio/medicamentos/medicamentos.component';

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




  //Error
  {path:'**', redirectTo:'/login', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
