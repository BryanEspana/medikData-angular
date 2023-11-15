import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DoctorInfoService } from '../../mis-docs/mis-docs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citas-pendientes',
  templateUrl: './citas-pendientes.component.html',
  styleUrls: ['./citas-pendientes.component.scss']
})
export class CitasPendientesComponent {
  citasPendientes: any[] = [];
  usertoken: string = '';
  rol: string = '';
  doctorNombre: string = '';

  constructor(
    private route: Router,
    private apiService: ApiService,
    private doctorInfoService: DoctorInfoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeDpi();
  }

  ngOnInit(): void {
    if (this.rol == 'paciente') {
      const storedDoctorDPI = this.doctorInfoService.getDoctorDpi();
      this.activatedRoute.params.subscribe((params) => {
        this.doctorNombre = params['nombre'];
      });

      if (this.doctorNombre != undefined) {
        if (storedDoctorDPI) {
          this.getCitasPendientesMedicoAsociado(storedDoctorDPI);
        }
      } else {
        this.getCitasPendientes();
      }
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
        this.citasPendientes = response.citasPendientes;
        this.citasPendientes.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );

  }
  getCitasPendientesMedicoAsociado(docdpi: string) {
    this.apiService.getCitasPendientesMedicoAsociado(this.usertoken, docdpi).subscribe(
      (response: any) => {
        console.log("citas por medico", response)
        this.citasPendientes = response.citas;
        this.citasPendientes.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  anularCita(cita: any): void {
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
            this.ngOnInit();
          },
          (error: any) => {
            console.error(error);
            Swal.fire('Cita anulada', '', 'success');
            this.ngOnInit();
          }
        );
      }
    });
  }

}
