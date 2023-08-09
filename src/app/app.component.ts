import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// app.component.ts
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
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
  title = 'medikdata';
  showFiller = false;

  isLoggedIn: boolean = false;
  sidenavExpanded: boolean = false;
  closeSidebar() {
    this.sidenavExpanded = false;
  }
  isSidebarOpen = true; // Inicialmente abierto

  // Cambiar el estado del sidebar cuando el tamaño de la pantalla cambie
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSidebarOpen = window.innerWidth >= 768; // Cambia a verdadero en pantallas grandes
  }

  ngOnInit() {
    this.isSidebarOpen = window.innerWidth >= 768; // Inicializa en función del tamaño actual
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

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
        this.updateLoginState();
    });
  }
  //Cambiar de esqueleto
  updateLoginState() {
    const currentRoute = this.router.url;
    const allowedRoutes = ['/inicio', '/dashboard', '/medicamentos', '/citas', '/agregar-cita', '/citas-pendientes', '/listado-citas', '/comentarios', '/configuracion'];
    this.isLoggedIn = allowedRoutes.includes(currentRoute);

  }

  //Logica de Sidenav
  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
  }


}
