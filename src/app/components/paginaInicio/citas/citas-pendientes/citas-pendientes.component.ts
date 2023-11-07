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
  usertoken: string = '';
  rol: string = '';

  constructor(
    private route: Router,
    private apiService: ApiService
  ) {
    this.initializeDpi();
  }

  ngOnInit(): void {
    if (this.rol == 'paciente') {
      this.getCitasPendientes();
    } else if (this.rol == 'doctor') {
      this.getCitasPendientesMedico();
    }
  }

  initializeDpi(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.usertoken = localStorage.getItem('user_dpi')!;
      this.rol = localStorage.getItem('profile_role')!;
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
    this.apiService.getCitasPendientes(this.usertoken).subscribe(
      (response: any) => {
        console.log('citas pendientes', response)
        this.citasPendientes = response.citasPendientes;
        this.citasPendientes.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );

  }
  getCitasPendientesMedico() {
    this.apiService.getCitasPendientesMedico(this.usertoken).subscribe(
      (response: any) => {
        console.log('citas pendientes', response)
        this.citasPendientes = response.citasPendientes;
        this.citasPendientes.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  anularCita(cita: any): void {
    console.log('cita a borrar', cita.citasid);
    Swal.fire({
      title: '¿Desea anular la cita?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      icon: 'question'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteCita(cita.citasid).subscribe(
          () => {
            Swal.fire('Cita anulada', '', 'success');
          },
          (error: any) => {
            console.error(error);
            Swal.fire('Cita anulada', '', 'success');
          }
        );
      }
    });
  }

}
