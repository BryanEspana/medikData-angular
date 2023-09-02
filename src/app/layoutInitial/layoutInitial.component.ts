import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layoutInitial',
  templateUrl: './layoutInitial.component.html',
  styleUrls: ['./layoutInitial.component.scss']
})
export class LayoutInitialComponent implements OnInit {
  profile_name: string = '';

  isLoggedIn: boolean = false;
  isOpened = true;
  sidenavExpanded: boolean = false;
  typeUser: number = 0;
  closeSidebar() {
    this.sidenavExpanded = false;
  }

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeProfile();
    this.validateProfile();
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
    //trae el rol del usuario
    initializeProfile(): void {
      const token = localStorage.getItem('jwt');
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        console.log("payload", payload);
        this.profile_name = payload.user_metadata.profile_role;
        console.log(this.profile_name);
      }
    }
    validateProfile(): void {
      if (this.profile_name == 'paciente') {
        this.typeUser = 1;
      } else if (this.profile_name == 'clinica') {
        this.typeUser = 2;
      } else {
        this.typeUser = 3;
      }
    }
}
