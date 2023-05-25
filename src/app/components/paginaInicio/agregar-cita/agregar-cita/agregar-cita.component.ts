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
  areas: string[] = [];
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
      case 'especialidad':
        this.selectedEspecialidad = option;
        break;
      case 'area':
        this.selectedArea = option;
        break;
      case 'clinica':
        this.selectedClinica = option;
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
        this.clinicas = response.user.map((clinic: any) => clinic.nombre);
      },
      (error) => {
        console.error('Error fetching clinics:', error);
      }
    );
  }
}
