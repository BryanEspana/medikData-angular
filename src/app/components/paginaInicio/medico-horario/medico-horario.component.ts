import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-medico-horario',
  templateUrl: './medico-horario.component.html',
  styleUrls: ['./medico-horario.component.scss']
})
export class MedicoHorarioComponent implements OnInit {
  searchControl = new FormControl('');
  horariosMedico: any[] = [];
  medicotoken: string = '';
  isEditMode: boolean = false;
  selectedRowIndex: number | null = null;
  horarioForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.searchControl.valueChanges.pipe(debounceTime(300));
  }

  ngOnInit(): void {
    this.medicotoken = localStorage.getItem('user_dpi')!;
    this.getHorarios();
    this.initializeHorarioForm();
  }

  initializeHorarioForm(): void {
    this.horarioForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      doctor_dpi: [this.medicotoken, Validators.required],
      disponibilidad_id: [null, Validators.required]
    });
  }

  regresar() {
    window.history.back();
  }

  getHorarios() {
    this.apiService.getHorarios(this.medicotoken).subscribe(
      (response: any) => {
        this.horariosMedico = response.horarios;
        // Sort horarios by date from nearest to furthest
        this.horariosMedico.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  enterEdit(index: number) {
    this.isEditMode = true;
    this.selectedRowIndex = index;
    const selectedHorario = this.horariosMedico[index];
    this.horarioForm.setValue({
      fecha: selectedHorario.fecha,
      hora: selectedHorario.hora,
      doctor_dpi: this.medicotoken,
      disponibilidad_id: selectedHorario.disponibilidad_id
    });
  }

  saveChanges() {
    if (this.selectedRowIndex !== null) {
      const updatedHorario = this.horarioForm.value;
  
      // Update the horariosMedico array with the new date and time values
      this.horariosMedico[this.selectedRowIndex].fecha = updatedHorario.fecha;
      this.horariosMedico[this.selectedRowIndex].hora = updatedHorario.hora;
  
      // Call the API service to update the horario on the server
      this.apiService.updateHorario(updatedHorario).subscribe(
        (response: any) => {
          // Handle the response as needed
          console.log('Horario updated successfully', response);
          this.ngOnInit();
        },
        (error: any) => {
          console.error('Error updating horario', error);
        }
      );
  
      // Reset selectedRowIndex after saving changes
      this.selectedRowIndex = null;
      this.isEditMode = false; // Exit edit mode
  
      // Sort horarios by date from nearest to furthest
      this.horariosMedico.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    }
  }  

  cancelEdit() {
    this.isEditMode = false;
    this.selectedRowIndex = null;
  }
}