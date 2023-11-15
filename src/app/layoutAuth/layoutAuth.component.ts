import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layoutAuth',
  templateUrl: './layoutAuth.component.html',
  styleUrls: ['./layoutAuth.component.scss']
})
export class LayoutAuthComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private router : Router,
  ) { }

  ngOnInit() {
  }
  updateLoginState() {
    const currentRoute = this.router.url;
    const allowedRoutes = ['/inicio', '/dashboard', '/medicamentos', '/citas', '/agregar-cita', '/citas-pendientes', '/citas-pendientes/:nombre',
    '/listado-citas', '/listado-medicos', '/configuracion', '/clinicas', '/pacientes', '/horario', 
    '/horario/agregar-horario', '/diagnostico/:citaid', '/clinica/:id_clinica/mis-doctores'];
    this.isLoggedIn = allowedRoutes.includes(currentRoute);

  }
}
