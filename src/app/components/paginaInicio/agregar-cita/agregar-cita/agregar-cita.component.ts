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
  selectedArea: string = 'Seleccionar';
  selectedClinica: string = 'Seleccionar';
  selectedMedico: string = 'Seleccionar';
  especialidades: string[] = [];
  clinicas: string[] = [];
  medicos: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.fetchOptionsFromDatabase();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownAbove = !this.isDropdownAbove;
  }

  selectOption(option: string, field: string): void {
    switch (field) {
      case 'clinica':
        this.selectedClinica = option;
        break;
      case 'especialidad':
        this.selectedEspecialidad = option;
        break;
      case 'medico':
        this.selectedMedico = option;
        break;

      default:
        break;
    }
  }

  fetchOptionsFromDatabase(): void {
    this.apiService.getClinicas().subscribe(
      (response: any) => {
        if (response && response.clinicas) {
          this.clinicas = response.clinicas.map((clinic: any) => clinic.nombre);
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching clinics:', error);
      }
    );

    this.apiService.getEspecialidades().subscribe(
      (response: any) => {
        if (response && response.especialidades) {
          this.especialidades = response.especialidades.map((especialidad: any) => especialidad.especialidades);
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching specialties:', error);
      }
    );

    this.apiService.getMedicos().subscribe(
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
