import { Component } from '@angular/core';

@Component({
  selector: 'app-usr-config',
  templateUrl: './usr-config.component.html',
  styleUrls: ['./usr-config.component.scss']
})
export class UsrConfigComponent {

  nameUser: string = '';

    constructor() { }

    ngOnInit(): void {
      this.initializeName();
    }

    //traer el nombre del usuario
    initializeName(): void {
      const token = localStorage.getItem('jwt');
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        console.log("payload", payload);
        this.nameUser = payload.user_metadata.full_name;
        console.log(this.nameUser);
      }
    }
}
