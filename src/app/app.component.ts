import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// app.component.ts
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('sidenavAnimation', [
      state('collapsed', style({
        backgroundColor: 'transparent'
      })),
      state('expanded', style({
        backgroundImage: 'linear-gradient(to right, #1A5F9C, #06316B)'
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ]),
    trigger('iconAnimation', [
      state('collapsed', style({
        color: 'white'
      })),
      state('expanded', style({
        color: 'inherit'
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ]),
  ]
})

export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer?: MatDrawer;
  screenWidth: number = window.innerWidth;
  isOpened = true;
  title = 'medikdata';
  showFiller = false;

  isLoggedIn: boolean = false;
  sidenavExpanded: boolean = false;
  typeUser = 1;
  closeSidebar() {
    this.sidenavExpanded = false;
  }

  constructor(private router: Router) {
    this.screenWidth = window.innerWidth;
    this.updateLoginState();
    this.router.events.subscribe((event) => {
        this.updateLoginState();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.updateSidebarState();
  }

  updateSidebarState() {
    if (this.screenWidth < 780) {
      this.isOpened = false; // Cerrar el sidebar si el ancho de pantalla es menor que 780px
    } else {
      this.isOpened = true; // De lo contrario, abrirlo
    }
  }
  //Logout, remover token
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



  //Cambiar de esqueleto
  updateLoginState() {
    const currentRoute = this.router.url;
    const allowedRoutes = ['/inicio', '/dashboard', '/medicamentos', '/citas', '/agregar-cita', '/citas-pendientes', '/listado-citas', '/comentarios', '/configuracion', '/clinicas', '/doctores', '/pacientes'];
    this.isLoggedIn = allowedRoutes.includes(currentRoute);

  }

  //Logica de Sidenav
  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
  }


}
