import { Component } from '@angular/core';
import { clinicsModel } from './clinics.model';
@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss']
})
export class ClinicasComponent {

    clinicas: clinicsModel[] = [
      {
        image: 'assets/citas/clinica.jpg',
        nameClinic: 'Clínica Medica Municipal',
        direction: ' 10av 10-23 Zona 5',
        description: 'Urgencias, laboratorio, farmacia, rayos X las 24 horas de lunes a domingo.'
      },
      {
        image: 'assets/citas/blue.png',
        nameClinic: 'Clinica Blue Medical',
        direction: ' 10av 10-78',
        description: 'Horas de lunes a domingo.'
      },
      {
        image: 'assets/citas/hospital.png',
        nameClinic: 'Clinica San Gabriel',
        direction: 'Zona 10',
        description: 'Partos Normal o cesárea'
      },

    ]

    //regeresar a la pagina anterior
    regresar() {
      window.history.back();
    }




}
