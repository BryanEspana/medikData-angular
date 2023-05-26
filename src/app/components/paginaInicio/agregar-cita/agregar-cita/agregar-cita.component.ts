import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.scss']
})
export class AgregarCitaComponent {
  isDropdownAbove: boolean = false;
  selectedEspecialidad: string = 'Seleccionar';
  selectedClinica: string = 'Seleccionar';
  selectedMedico: string = 'Seleccionar';
  especialidades: string[] = [];
  clinicas: { nombre: string, id_clinica: number }[] = [];
  medicos: string[] = [];
  id_clinica: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.fetchClinicasFromDatabase();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownAbove = !this.isDropdownAbove;
  }

  selectOption(option: any, field: string): void {
    switch (field) {
      case 'clinica':
        this.selectedClinica = option.nombre;
        this.id_clinica = option.id_clinica;
        this.fetchSpecialtiesForClinic(this.id_clinica);
        this.selectedEspecialidad = 'Seleccionar';
        this.selectedMedico = 'Seleccionar';
        break;
      case 'especialidad':
        this.selectedEspecialidad = option;
        this.selectedMedico = 'Seleccionar';
        const normalizedOption = option.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        this.fetchDoctorsForClinicAndSpecialty(this.id_clinica, normalizedOption);
        break;
      case 'medico':
        this.selectedMedico = option;
        break;
      default:
        break;
    }
  }

  fetchClinicasFromDatabase(): void {
    this.apiService.getClinicas().subscribe(
      (response: any) => {
        if (response && response.clinicas) {
          this.clinicas = response.clinicas.map((clinic: any) => ({
            nombre: clinic.nombre,
            id_clinica: clinic.id_clinica
          }));
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching clinics:', error);
      }
    );
  }

  fetchSpecialtiesForClinic(id_clinica: number): void {
    this.apiService.getEspecialidades(id_clinica).subscribe(
      (response: any) => {
        if (response && response.especialidades) {
          this.especialidades = response.especialidades.flatMap((especialidad: any) => especialidad.medico.map((medico: any) => medico.especialidad));
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching specialties:', error);
      }
    );
  }


  fetchDoctorsForClinicAndSpecialty(id_clinica: number, especialidad: string): void {
    this.apiService.getMedicos(id_clinica, especialidad).subscribe(
      (response: any) => {
        if (response && response.medico) {
          this.medicos = response.medico.map((medico: any) => `${medico.nombres} ${medico.apellidos}`);
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

}
