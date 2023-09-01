import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layoutInitial',
  templateUrl: './layoutInitial.component.html',
  styleUrls: ['./layoutInitial.component.scss']
})
export class LayoutInitialComponent implements OnInit {
  isLoggedIn: boolean = false;
  isOpened = true;
  sidenavExpanded: boolean = false;
  typeUser = 1;
  
  closeSidebar() {
    this.sidenavExpanded = false;
  }
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  updateLoginState() {
    const currentRoute = this.router.url;
    const allowedRoutes = ['/inicio', '/dashboard', '/medicamentos', '/citas', '/agregar-cita', '/citas-pendientes', '/listado-citas', '/comentarios', '/configuracion', '/clinicas', '/doctores', '/pacientes'];
    this.isLoggedIn = allowedRoutes.includes(currentRoute);

  }
  RemoveTokenLogOut() {
    //remueve el token
    localStorage.removeItem('jwt');
    //cierra el sidenav
    this.sidenavExpanded = false;
    //devuelve al login
    Swal.fire({
      title: '¡Hasta la próxima!',
      text: 'Cerrado de sesión correcto.',
      icon: 'success'
    }).then(() => {
      this.router.navigate(['/login']);
    });

  }
  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
  }
}
