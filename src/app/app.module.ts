import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/session/login/login.component';
import { RegisterComponent } from './components/session/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtectedComponent } from './protected/protected.component';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
//import angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitasComponent } from './components/paginaInicio/citas/citas.component';
import { MedicamentosComponent } from './components/paginaInicio/medicamentos/medicamentos.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProtectedComponent,
    DashboardComponent,
    CitasComponent,
    MedicamentosComponent,
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
        BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
