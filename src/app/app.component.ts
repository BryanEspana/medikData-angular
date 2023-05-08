import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// app.component.ts
import { animate, state, style, transition, trigger } from '@angular/animations';

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

  isLoggedIn: boolean = false;
  sidenavExpanded: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginState();
      }
    });
  }
  //Cambiar de esqueleto
  updateLoginState() {
    const currentRoute = this.router.url;
    this.isLoggedIn = currentRoute === '/inicio' || currentRoute === '/dashboard';
  }

  //Logica de Sidenav
  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
  }

}
