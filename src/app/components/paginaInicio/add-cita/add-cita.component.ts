import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.scss']
})
export class AddCitaComponent {
  especialidades = [
    { value: 'no-claro', label: 'No lo tengo claro' },
    { value: 'cardiologo', label: 'Cardiologo' },
    { value: 'odontologo', label: 'Odontologo' }
    // ... otras opciones obtenidas del backend
  ];
  selectedDate = new FormControl();

  onDateSelected(event: any): void {
    // Aquí puedes realizar acciones con la fecha seleccionada
    console.log('Fecha seleccionada:', event.value);
  }

  regresar() {
    window.history.back();
  }

}
