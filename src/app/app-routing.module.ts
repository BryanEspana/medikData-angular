import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/session/login/login.component';
import { RegisterComponent } from './components/session/register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';

const routes: Routes = [
//RUTAS
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  //Session
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  //Dashboard
  {path:'dashboard', component: DashboardComponent},
  //Error
  {path:'**', redirectTo:'/login', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
