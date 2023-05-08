import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medikdata';

  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginState();
      }
    });
  }

  updateLoginState() {
    const currentRoute = this.router.url;
    this.isLoggedIn = currentRoute === '/inicio' || currentRoute === '/dashboard';
  }
}
