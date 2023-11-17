import { Component } from '@angular/core';

@Component({
  selector: 'app-usr-config',
  templateUrl: './usr-config.component.html',
  styleUrls: ['./usr-config.component.scss']
})
export class UsrConfigComponent {
    nameUser: string = '';
    phoneUser: string = '';
    profileRole: string = '';
    userPeso: number = 0;
    userAltura: number = 0;
    alergias: string = '';
    enfermedades: string = '';

    constructor() { }

    ngOnInit(): void {
      this.initializeName();
      this.profileRole = localStorage.getItem('profile_role')!;
    }

    initializeName(): void {
      const token = localStorage.getItem('jwt');
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        this.nameUser = payload.user_metadata.full_name;
        this.phoneUser = payload.user_metadata.telefono;
        this.userAltura = payload.user_metadata.altura;
        this.userPeso = payload.user_metadata.peso;
      }
    }
}
