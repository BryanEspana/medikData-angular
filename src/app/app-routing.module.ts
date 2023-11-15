import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/session/login/login.component';
import { RegisterComponent } from './components/session/register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { MedicamentosComponent } from './components/paginaInicio/medicamentos/medicamentos.component';
import { CitasComponent } from './components/paginaInicio/citas/citas.component';
import { CitasPendientesComponent } from './components/paginaInicio/citas/citas-pendientes/citas-pendientes.component';
import { ListadoCitasComponent } from './components/paginaInicio/citas/listado-citas/listado-citas.component';
import { ReseniasComponent } from './components/paginaInicio/resenias/resenias.component';
import { UsrConfigComponent } from './components/paginaInicio/user-configuracion/usr-config/usr-config.component';
import { AgregarCitaComponent } from './components/paginaInicio/agregar-cita/agregar-cita/agregar-cita.component';
import { ClinicasComponent } from './components/paginaInicio/clinicas/clinicas.component';
import { DoctoresComponent } from './components/clinica/doctores/doctores.component';
import { PacientesComponent } from './components/clinica/pacientes/pacientes.component';
import { ListadoMedicosComponent } from './components/paginaInicio/listado-medicos/listado-medicos.component';
import { AgregarMedicoComponent } from './components/paginaInicio/agregar-medico/agregar-medico.component';
import { MedicoHorarioComponent } from './components/paginaInicio/medico-horario/medico-horario.component';
import { AgregarHorarioComponent } from './components/paginaInicio/agregar-horario/agregar-horario.component';
import { DiagnosticosComponent } from './components/paginaInicio/diagnosticos/diagnosticos.component';
import { LayoutInitialComponent } from './layoutInitial/layoutInitial.component';
import { RecoverComponent } from './components/session/recover/recover.component';
import { MisDocsComponent } from './components/paginaInicio/mis-docs/mis-docs.component';
import { UpdateComponent } from './components/session/update/update.component';
const routes: Routes = [
//RUTAS
{ path: '', component: LoginComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{path:'recover', component: RecoverComponent },
{path: 'user/update', component: UpdateComponent },
{ path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },

//Session
  {
    path: '',
    canActivate: [AuthGuard], 
    children: [
      //User Auth

      //Dashboard
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    
      //Medicamentos
      {path:'medicamentos', component: MedicamentosComponent, canActivate: [AuthGuard]},
      //Citas
      {path:'citas', component: CitasComponent, canActivate:[AuthGuard]},
      {path:'citas-pendientes', component: CitasPendientesComponent, canActivate:[AuthGuard]},
      {path: 'citas-pendientes/:nombre', component: CitasPendientesComponent, canActivate:[AuthGuard]},
      {path:'listado-citas', component: ListadoCitasComponent, canActivate:[AuthGuard]},
      {path:'agregar-cita', component: AgregarCitaComponent, canActivate:[AuthGuard]},

      //Añadir cita

      //Reseñas
      {path:'comentarios', component: ReseniasComponent, canActivate:[AuthGuard]},

      //Configuracion Usuario
      {path:'configuracion', component: UsrConfigComponent, canActivate:[AuthGuard]},

      //Clinicas
      {path:'clinicas', component: ClinicasComponent, canActivate:[AuthGuard]},
      {path: 'doctores', component: DoctoresComponent, canActivate:[AuthGuard]},
      {path: 'listado-medicos', component: ListadoMedicosComponent, canActivate:[AuthGuard]},
      {path: 'agregar-medico', component: AgregarMedicoComponent, canActivate:[AuthGuard]},
      {path: 'clinica/:id_clinica/mis-doctores', component: MisDocsComponent, canActivate:[AuthGuard]},

      //Medicos
      {path: 'pacientes', component: PacientesComponent, canActivate:[AuthGuard]},
      {path: 'horario', component: MedicoHorarioComponent, canActivate:[AuthGuard]},
      {path: 'horario/agregar-horario', component: AgregarHorarioComponent, canActivate:[AuthGuard]},
      {path: 'diagnostico/:citaid', component: DiagnosticosComponent, canActivate:[AuthGuard]},
    ]
  },

  //Error
  {path:'**', redirectTo:'/login', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
