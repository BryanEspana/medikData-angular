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
  constructor(
    private route: Router
  ) { }


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

}
