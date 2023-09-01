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
    const allowedRoutes = ['/inicio', '/dashboard', '/medicamentos', '/citas', '/agregar-cita', '/citas-pendientes', '/listado-citas', '/comentarios', '/configuracion', '/clinicas', '/doctores', '/pacientes'];
    this.isLoggedIn = allowedRoutes.includes(currentRoute);

  }
}
