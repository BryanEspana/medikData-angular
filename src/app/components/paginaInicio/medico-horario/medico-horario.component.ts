import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

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
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Horario actualizado',
            showConfirmButton: false,
            timer: 1500
          });
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

  deleteHorario(disponibilidadId: number) {
    console.log(disponibilidadId);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the API service to delete the horario on the server
        this.apiService.deleteHorario({ disponibilidad_id: disponibilidadId, doctor_dpi: this.medicotoken }).subscribe(
          (response: any) => {
            // Show success message
            Swal.fire({
              icon: 'success',
              title: 'Horario borrado',
              showConfirmButton: false,
              timer: 1500
            });
            // Remove the deleted horario from the horariosMedico array
            this.horariosMedico = this.horariosMedico.filter(horario => horario.disponibilidad_id !== disponibilidadId);
            this.isEditMode = false;
            this.ngOnInit();
          },
          (error: any) => {
            console.error('Error deleting horario', error);
          }
        );
      }
    });
  }
}