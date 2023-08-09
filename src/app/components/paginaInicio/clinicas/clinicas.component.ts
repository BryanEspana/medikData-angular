import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss']
})
export class ClinicasComponent {
    //regeresar a la pagina anterior
    regresar() {
      window.history.back();
    }


}
