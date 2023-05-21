import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//IMPORTACIONES DE RUTAS
import { LoginComponent } from './components/session/login/login.component';
import { RegisterComponent } from './components/session/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtectedComponent } from './protected/protected.component';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitasComponent } from './components/paginaInicio/citas/citas.component';
import { MedicamentosComponent } from './components/paginaInicio/medicamentos/medicamentos.component';
//IMPORTACIONES DE ANGULAR MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddCitaComponent } from './components/paginaInicio/add-cita/add-cita.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CitasPendientesComponent } from './components/paginaInicio/citas/citas-pendientes/citas-pendientes.component';
import { ListadoCitasComponent } from './components/paginaInicio/citas/listado-citas/listado-citas.component';
import { ReseniasComponent } from './components/paginaInicio/resenias/resenias.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProtectedComponent,
    DashboardComponent,
    CitasComponent,
    MedicamentosComponent,
    AddCitaComponent,
    CitasPendientesComponent,
    ListadoCitasComponent,
    ReseniasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
