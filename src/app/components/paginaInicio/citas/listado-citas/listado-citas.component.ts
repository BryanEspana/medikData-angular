import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.scss']
})
export class ListadoCitasComponent {
  searchControl = new FormControl('');
  citasRealizadas: any[] = [];
  pacientetoken: string = '';
  tablaData = [
    { fecha: '2023-05-21', hora: '09:00 AM', clinica: 'Clínica A', doctor: 'Dr. Juan' },
    { fecha: '2023-05-22', hora: '10:30 AM', clinica: 'Clínica B', doctor: 'Dra. María' },
    { fecha: '2023-05-23', hora: '11:45 AM', clinica: 'Clínica C', doctor: 'Dr. Carlos' },
    // Agrega más filas de datos según sea necesario
  ];
  filteredTablaData: any[] = [];

  constructor(
    private route: Router,
    private apiService: ApiService
    ) {
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe(value => {
      if (typeof value === 'string') {
        this.filterTablaData(value);
      }
    });
    this.initializeDpi();
  }

  filterTablaData(value: string) {
    const searchValue = value ? value.trim().toLowerCase() : '';
  
    if (searchValue) {
      this.filteredTablaData = this.tablaData.filter(item => {
        return (
          item.fecha.toLowerCase().includes(searchValue) ||
          item.hora.toLowerCase().includes(searchValue) ||
          item.clinica.toLowerCase().includes(searchValue) ||
          item.doctor.toLowerCase().includes(searchValue)
        );
      });
    } else {
      this.filteredTablaData = this.tablaData.slice();
    }
  }
  
  ngOnInit(): void {
    this.getCitasRealizadas();
  }

  initializeDpi(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      this.pacientetoken = payload.user_metadata.dpi;
    }
  }

  visualizarItem(item: any) {
    // Implementa el código para visualizar el elemento seleccionado
    console.log(item);
  }

  regresar() {
    window.history.back();
  }
  
  getCitasRealizadas() {
    this.apiService.getCitas(this.pacientetoken).subscribe(
      (response: any) => {
        this.citasRealizadas = response.citas;
        console.log(this.citasRealizadas);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

}

