import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-citas-pendientes',
  templateUrl: './citas-pendientes.component.html',
  styleUrls: ['./citas-pendientes.component.scss']
})
export class CitasPendientesComponent {
  citasPendientes: any[] = [];
  pacientetoken: string = '';

  constructor(
    private route: Router,
    private apiService: ApiService
  ) { 
    this.initializeDpi();
  }

  ngOnInit(): void {
    this.getCitasPendientes();
  }

  initializeDpi(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      this.pacientetoken = payload.user_metadata.dpi;
    }
  }

  regresar() {
    window.history.back();
  }


  ngAfterViewInit() {
    const btnAnularCita = document.querySelector('#btnAnularCita');
    btnAnularCita?.addEventListener('click', () => {
      Swal.fire({
        title: '¿Desea anular la cita?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        cancelButtonColor: '#d33',
        icon: 'question'
      }).then((result) => {
        if (result.value) {
          Swal.fire('Cita anulada', '', 'success');
        }
      });
    });
  }

  getCitasPendientes() {
    this.apiService.getCitasPendientes(this.pacientetoken).subscribe(
      (response: any) => {
        this.citasPendientes = response.citasPendientes;
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

}
