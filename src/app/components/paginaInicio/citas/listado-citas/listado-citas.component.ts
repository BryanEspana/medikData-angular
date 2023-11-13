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

  constructor(
    private route: Router,
    private apiService: ApiService
    ) {
    this.searchControl.valueChanges
    .pipe(debounceTime(300));
    this.initializeDpi();
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
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

}

