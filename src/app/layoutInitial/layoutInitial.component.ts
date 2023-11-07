import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-layoutInitial',
  templateUrl: './layoutInitial.component.html',
  styleUrls: ['./layoutInitial.component.scss']
})
export class LayoutInitialComponent implements OnInit {

  profile_name: string = '';
  user_dpi: string = '';
  isLoggedIn: boolean = false;
  isOpened = true;
  sidenavExpanded: boolean = false;
  typeUser: number = 0;

  closeSidebar() {
    this.sidenavExpanded = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize((event.target as Window).innerWidth);
  }


  checkWindowSize(width: number) {
      if (width <= 780) {
        this.isOpened = false;
      } else {
        this.isOpened = true;
      }
    }



  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.initializeProfile();
    this.validateProfile();
    this.checkWindowSize(window.innerWidth);

  }

  updateLoginState() {
    const currentRoute = this.router.url;
    const allowedRoutes = ['/inicio', '/dashboard', '/medicamentos', '/citas', '/agregar-cita', '/citas-pendientes', '/listado-citas', '/comentarios', '/configuracion', '/clinicas', '/pacientes', '/horario', '/horario/agregar-horario'];
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
        this.user_dpi = payload.user_metadata.dpi;
        localStorage.setItem('profile_role', this.profile_name);
        localStorage.setItem('user_dpi', this.user_dpi);
        console.log(this.profile_name);
      }
    }
    validateProfile(): void {
      if (this.profile_name == 'paciente') {
        this.typeUser = 1;
      } else if (this.profile_name == 'clinica') {
        this.typeUser = 2;
        // Llamar a la función que trae el ID de la clinica
        this.apiService.getClinicaID(this.user_dpi).subscribe(
          (response: any) => {
            console.log(response)
            localStorage.setItem('clinica_id', response.clinica.id_clinica);
          },
          (error: any) => {
            console.log(error);
          }
        )
      } else {
        this.typeUser = 3;
      }
    }
}
